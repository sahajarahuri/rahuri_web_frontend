"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Eclipse,
  Lightbulb,
  Bed,
  Link,
  File,
  Image,
  Calendar,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";


const EditableSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    icon: "WbTwilight",
    links: [],
  });
  const [additionalContent, setAdditionalContent] = useState({
    joinNextSessionLink: "",
    sacredResources: [],
  });
  const { toast } = useToast();

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const fetchSessions = useCallback(async () => {
    const response = await fetch("/api/sessions");
    const data = await response.json();
    setSessions(data);
  }, []);

  const fetchAdditionalContent = useCallback(async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setAdditionalContent({
        joinNextSessionLink: data.joinNextSessionLink || "",
        sacredResources: Array.isArray(data.sacredResources)
          ? data.sacredResources
          : [],
      });
    } catch (error) {
      console.error("Error fetching additional content:", error);
      setAdditionalContent({
        joinNextSessionLink: "",
        sacredResources: [],
      });
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    fetchAdditionalContent();
  }, [fetchSessions, fetchAdditionalContent]);

  const handleAddSession = async () => {
    const token = getToken();
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSession),
    });
    if (response.ok) {
      setNewSession({
        title: "",
        date: "",
        time: "",
        icon: "WbTwilight",
        links: [],
      });
      fetchSessions();
      toast({ title: "Session added successfully" });
    } else {
      toast({ title: "Failed to add session", variant: "destructive" });
    }
  };

  const handleUpdateSession = async (id, updatedSession) => {
    const token = getToken();
    const response = await fetch("/api/sessions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...updatedSession }),
    });
    if (response.ok) {
      fetchSessions();
      toast({ title: "Session updated successfully" });
    } else {
      toast({ title: "Failed to update session", variant: "destructive" });
    }
  };

  const handleDeleteSession = async (id) => {
    const token = getToken();
    const response = await fetch("/api/sessions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      fetchSessions();
      toast({ title: "Session deleted successfully" });
    } else {
      toast({ title: "Failed to delete session", variant: "destructive" });
    }
  };

  const handleUpdateAdditionalContent = async () => {
    const token = getToken();
    const updatedContent = {
      ...additionalContent,
      sacredResources: Array.isArray(additionalContent.sacredResources)
        ? additionalContent.sacredResources
        : [],
    };
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedContent),
    });
    if (response.ok) {
      toast({ title: "Additional content updated successfully" });
    } else {
      toast({
        title: "Failed to update additional content",
        variant: "destructive",
      });
    }
  };

  const iconComponents = {
    EclipseIcon: Eclipse,
    LightbulbIcon: Lightbulb,
    BedIcon: Bed,
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Add New Session
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Session Title"
              value={newSession.title}
              onChange={(e) =>
                setNewSession({ ...newSession, title: e.target.value })
              }
            />
            <div className="flex space-x-4">
              <div className="flex-1">
                <DatePicker
                  selected={newSession.date ? new Date(newSession.date) : null}
                  onSelect={(date) =>
                    setNewSession({
                      ...newSession,
                      date: date?.toISOString() || "",
                    })
                  }
                  placeholderText="Select date"
                />
              </div>
              <div className="flex-1">
                <TimePicker
                  value={newSession.time}
                  onChange={(time) => setNewSession({ ...newSession, time })}
                  placeholder="Select time"
                />
              </div>
            </div>
            <select
              className="w-full p-2 border rounded"
              value={newSession.icon}
              onChange={(e) =>
                setNewSession({ ...newSession, icon: e.target.value })
              }
            >
              <option value="WbTwilight">Morning</option>
              <option value="LightMode">Afternoon</option>
              <option value="NightsStay">Evening</option>
            </select>
            <Input
              placeholder="Image URL"
              value={newSession.imageUrl || ""}
              onChange={(e) =>
                setNewSession({ ...newSession, imageUrl: e.target.value })
              }
            />
            <div className="space-y-2">
              {newSession.links?.map((link, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Link type (e.g., Google Meet, Telegram)"
                    value={link.type}
                    onChange={(e) => {
                      const updatedLinks = [...newSession.links];
                      updatedLinks[index].type = e.target.value;
                      setNewSession({ ...newSession, links: updatedLinks });
                    }}
                  />
                  <Input
                    placeholder="Link URL"
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...newSession.links];
                      updatedLinks[index].url = e.target.value;
                      setNewSession({ ...newSession, links: updatedLinks });
                    }}
                  />
                  <Button
                    onClick={() => {
                      const updatedLinks = newSession.links.filter(
                        (_, i) => i !== index
                      );
                      setNewSession({ ...newSession, links: updatedLinks });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  setNewSession({
                    ...newSession,
                    links: [...newSession.links, { type: "", url: "" }],
                  })
                }
              >
                Add Link
              </Button>
            </div>
            <Button onClick={handleAddSession}>Add Session</Button>
          </div>
        </CardContent>
      </Card>

      {sessions?.map((session) => (
        <Card
          key={session._id}
          className="bg-gradient-to-r from-background to-secondary"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {iconComponents[session.icon] &&
                  React.createElement(iconComponents[session.icon], {
                    className: "text-primary",
                  })}
                <Input
                  value={session.title}
                  onChange={(e) =>
                    handleUpdateSession(session._id, {
                      ...session,
                      title: e.target.value,
                    })
                  }
                  className="text-xl font-medium text-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <DatePicker
                    selected={session.date ? new Date(session.date) : null}
                    onSelect={(date) =>
                      handleUpdateSession(session._id, {
                        ...session,
                        date: date?.toISOString() || "",
                      })
                    }
                    placeholderText="Select date"
                  />
                </div>
                <div className="flex-1">
                  <TimePicker
                    value={session.time}
                    onChange={(time) =>
                      handleUpdateSession(session._id, { ...session, time })
                    }
                    placeholder="Select time"
                  />
                </div>
              </div>
              <Input
                value={session.imageUrl || ""}
                onChange={(e) =>
                  handleUpdateSession(session._id, {
                    ...session,
                    imageUrl: e.target.value,
                  })
                }
                placeholder="Image URL"
              />
              {session.links?.map((link, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={link.type}
                    onChange={(e) => {
                      const updatedLinks = [...session.links];
                      updatedLinks[index].type = e.target.value;
                      handleUpdateSession(session._id, {
                        ...session,
                        links: updatedLinks,
                      });
                    }}
                    placeholder="Link type"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...session.links];
                      updatedLinks[index].url = e.target.value;
                      handleUpdateSession(session._id, {
                        ...session,
                        links: updatedLinks,
                      });
                    }}
                    placeholder="Link URL"
                  />
                  <Button
                    onClick={() => {
                      const updatedLinks = session.links.filter(
                        (_, i) => i !== index
                      );
                      handleUpdateSession(session._id, {
                        ...session,
                        links: updatedLinks,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  handleUpdateSession(session._id, {
                    ...session,
                    links: [...session.links, { type: "", url: "" }],
                  })
                }
              >
                Add Link
              </Button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDeleteSession(session._id)}
              >
                Delete Session
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Additional Content
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Join Next Session Link"
              value={additionalContent.joinNextSessionLink}
              onChange={(e) =>
                setAdditionalContent({
                  ...additionalContent,
                  joinNextSessionLink: e.target.value,
                })
              }
            />
            <div className="space-y-2">
              {additionalContent.sacredResources?.map((resource, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Resource Title"
                    value={resource.title}
                    onChange={(e) => {
                      const updatedResources = [
                        ...additionalContent.sacredResources,
                      ];
                      updatedResources[index].title = e.target.value;
                      setAdditionalContent({
                        ...additionalContent,
                        sacredResources: updatedResources,
                      });
                    }}
                  />
                  <Input
                    placeholder="Resource Icon"
                    value={resource.icon}
                    onChange={(e) => {
                      const updatedResources = [
                        ...additionalContent.sacredResources,
                      ];
                      updatedResources[index].icon = e.target.value;
                      setAdditionalContent({
                        ...additionalContent,
                        sacredResources: updatedResources,
                      });
                    }}
                  />
                  <Button
                    onClick={() => {
                      const updatedResources =
                        additionalContent.sacredResources.filter(
                          (_, i) => i !== index
                        );
                      setAdditionalContent({
                        ...additionalContent,
                        sacredResources: updatedResources,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  setAdditionalContent({
                    ...additionalContent,
                    sacredResources: [
                      ...additionalContent.sacredResources,
                      { title: "", icon: "" },
                    ],
                  })
                }
              >
                Add Sacred Resource
              </Button>
            </div>
            <Button onClick={handleUpdateAdditionalContent}>
              Update Additional Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditableSchedule;

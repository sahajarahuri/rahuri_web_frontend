"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Eclipse,
  Lightbulb,
  Bed,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Sparkles,
  Youtube,
  ExternalLink,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Link2,
  Check,
  PlusCircle,
  FileText,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { format } from "date-fns";

const iconMapping = {
  EclipseIcon: { icon: Eclipse, label: "Morning Meditation (Eclipse)" },
  LightbulbIcon: { icon: Lightbulb, label: "Daytime Session (Lightbulb)" },
  BedIcon: { icon: Bed, label: "Evening Session (Bed)" },
};

const EditableSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    icon: "EclipseIcon",
    links: [],
    imageUrl: "",
  });

  // State for session currently being edited
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionData, setEditingSessionData] = useState(null);

  const [additionalContent, setAdditionalContent] = useState({
    joinNextSessionLink: "",
    sacredResources: [],
  });

  const [scheduleContent, setScheduleContent] = useState({
    headingEn: "",
    headingHi: "",
    subtitleEn: "",
    subtitleHi: "",
    centerNameEn: "",
    centerNameHi: "",
    addressEn: "",
    addressHi: "",
    dateRangeEn: "",
    dateRangeHi: "",
    youtubeDescEn: "",
    youtubeDescHi: "",
    joinSessionLink: "",
    bannerTextEn: "",
    bannerTextHi: "",
    officialWebsiteUrl: "",
    documentaryUrl: "",
  });

  const { toast } = useToast();

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch("/api/sessions");
      const data = await response.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({ title: "Failed to load sessions", variant: "destructive" });
    }
  }, [toast]);

  const fetchAdditionalContent = useCallback(async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setAdditionalContent({
        joinNextSessionLink: data.joinNextSessionLink || "",
        sacredResources: Array.isArray(data.sacredResources) ? data.sacredResources : [],
      });
    } catch (error) {
      console.error("Error fetching additional content:", error);
    }
  }, []);

  const fetchScheduleContent = useCallback(async () => {
    try {
      const response = await fetch("/api/schedule");
      const data = await response.json();
      setScheduleContent({
        headingEn: data.headingEn || "Weekly Meditation Schedule",
        headingHi: data.headingHi || "साप्ताहिक ध्यान कार्यक्रम",
        subtitleEn: data.subtitleEn || "Join our sacred meditation sessions every Thursday on YouTube.",
        subtitleHi: data.subtitleHi || "हर गुरुवार यूट्यूब पर हमारे पवित्र ध्यान सत्र में शामिल हों।",
        centerNameEn: data.centerNameEn || "Sahaja Yoga Meditation Center",
        centerNameHi: data.centerNameHi || "सहज योग ध्यान केंद्र",
        addressEn: data.addressEn || "Shri Swayambhu Ekadash Rudra Bhumi, Musalwadi, Rahuri",
        addressHi: data.addressHi || "श्री स्वयंभू एकादश रुद्र भूमी, मुसळवाडी, राहुरी",
        dateRangeEn: data.dateRangeEn || "January 31 to February 2, 2025",
        dateRangeHi: data.dateRangeHi || "31 जानेवारी ते 2 फेब्रुवारी 2025",
        youtubeDescEn: data.youtubeDescEn || "Live broadcast of Shri Ekadash Rudra meditation session and Puja Havan via YouTube channel",
        youtubeDescHi: data.youtubeDescHi || "यूट्यूब चैनल के माध्यम से श्री एकादश रुद्र ध्यान सत्र एवं पूजा हवन लाइव प्रसारण",
        joinSessionLink: data.joinSessionLink || "",
        bannerTextEn: data.bannerTextEn || "International Sahaja Yoga Meditation Center",
        bannerTextHi: data.bannerTextHi || "आंतरराष्ट्रीय सहज योग ध्यान केंद्र",
        officialWebsiteUrl: data.officialWebsiteUrl || "https://Rahurisahajyoga.com",
        documentaryUrl: data.documentaryUrl || "https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB",
      });
    } catch (error) {
      console.error("Error fetching schedule content:", error);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    fetchAdditionalContent();
    fetchScheduleContent();
  }, [fetchSessions, fetchAdditionalContent, fetchScheduleContent]);

  // Session Handlers
  const handleAddSession = async () => {
    if (!newSession.title || !newSession.date || !newSession.time) {
      toast({ title: "Title, Date, and Time are required", variant: "destructive" });
      return;
    }

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
        icon: "EclipseIcon",
        links: [],
        imageUrl: "",
      });
      setIsAddingSession(false);
      fetchSessions();
      toast({ title: "Session added successfully" });
    } else {
      toast({ title: "Failed to add session", variant: "destructive" });
    }
  };

  const startEditingSession = (session) => {
    setEditingSessionId(session._id);
    setEditingSessionData({
      title: session.title || "",
      date: session.date || "",
      time: session.time || "",
      icon: session.icon || "EclipseIcon",
      imageUrl: session.imageUrl || "",
      links: Array.isArray(session.links) ? JSON.parse(JSON.stringify(session.links)) : [],
    });
  };

  const cancelEditingSession = () => {
    setEditingSessionId(null);
    setEditingSessionData(null);
  };

  const handleUpdateSession = async (id) => {
    if (!editingSessionData.title || !editingSessionData.date || !editingSessionData.time) {
      toast({ title: "Title, Date, and Time are required", variant: "destructive" });
      return;
    }

    const token = getToken();
    const response = await fetch("/api/sessions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...editingSessionData }),
    });

    if (response.ok) {
      setEditingSessionId(null);
      setEditingSessionData(null);
      fetchSessions();
      toast({ title: "Session updated successfully" });
    } else {
      toast({ title: "Failed to update session", variant: "destructive" });
    }
  };

  const handleDeleteSession = async (id) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

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

  // Additional Content Handlers
  const handleUpdateAdditionalContent = async () => {
    const token = getToken();
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(additionalContent),
    });

    if (response.ok) {
      toast({ title: "Additional content updated successfully" });
      fetchAdditionalContent();
    } else {
      toast({ title: "Failed to update additional content", variant: "destructive" });
    }
  };

  // Schedule Content Handler
  const handleUpdateScheduleContent = async () => {
    const token = getToken();
    const response = await fetch("/api/schedule", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scheduleContent),
    });

    if (response.ok) {
      toast({ title: "Schedule content updated successfully" });
      fetchScheduleContent();
    } else {
      toast({ title: "Failed to update schedule content", variant: "destructive" });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date set";
    try {
      return format(new Date(dateStr), "PPP");
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 dark:bg-zinc-900/70 border border-primary/10 rounded-xl p-1 mb-8">
          <TabsTrigger value="sessions" className="rounded-lg py-2.5 font-semibold text-sm">
            Meditation Sessions
          </TabsTrigger>
          <TabsTrigger value="content" className="rounded-lg py-2.5 font-semibold text-sm">
            Page Content (Bilingual)
          </TabsTrigger>
          <TabsTrigger value="resources" className="rounded-lg py-2.5 font-semibold text-sm">
            Links & Sacred Resources
          </TabsTrigger>
        </TabsList>

        {/* ---------------- SESSIONS TAB ---------------- */}
        <TabsContent value="sessions" className="space-y-6 outline-none">
          {/* Header Action Row */}
          <div className="flex justify-between items-center bg-white/60 dark:bg-zinc-900/60 p-4 rounded-2xl border border-primary/10">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Meditation Sessions</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Add or edit upcoming dhyan sessions</p>
            </div>
            {!isAddingSession && (
              <Button
                onClick={() => setIsAddingSession(true)}
                className="bg-primary hover:bg-primary/95 text-white flex items-center space-x-2 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                <span>Add Session</span>
              </Button>
            )}
          </div>

          {/* Add Session Form (Toggleable Card) */}
          <AnimatePresence>
            {isAddingSession && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border border-primary/30 shadow-lg bg-white/95 dark:bg-zinc-900/95 rounded-[1.5rem] overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-primary/10 py-4 px-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-primary">Create New Session</CardTitle>
                      <CardDescription>Enter details to add this session to the homepage schedule</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsAddingSession(false)}
                      className="rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Basic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Session Title</Label>
                        <Input
                          placeholder="e.g., Evening Meditation"
                          value={newSession.title}
                          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                          className="border-primary/20 rounded-xl focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Session Icon</Label>
                        <select
                          className="w-full p-2 border border-primary/20 bg-background rounded-xl focus:ring-1 focus:ring-primary focus:border-primary h-10 px-3 outline-none"
                          value={newSession.icon}
                          onChange={(e) => setNewSession({ ...newSession, icon: e.target.value })}
                        >
                          {Object.entries(iconMapping).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date and Time Pickers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 flex flex-col">
                        <Label className="mb-1">Date</Label>
                        <DatePicker
                          selected={newSession.date ? new Date(newSession.date) : null}
                          onSelect={(date) =>
                            setNewSession({ ...newSession, date: date ? date.toISOString() : "" })
                          }
                          placeholderText="Select session date"
                        />
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <Label className="mb-1">Time</Label>
                        <TimePicker
                          value={newSession.time}
                          onChange={(time) => setNewSession({ ...newSession, time })}
                          placeholder="Select session time"
                        />
                      </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                      <Label>Image URL (Optional)</Label>
                      <Input
                        placeholder="https://i.ytimg.com/vi/.../hqdefault.jpg"
                        value={newSession.imageUrl || ""}
                        onChange={(e) => setNewSession({ ...newSession, imageUrl: e.target.value })}
                        className="border-primary/20 rounded-xl focus-visible:ring-primary"
                      />
                    </div>

                    {/* Links list */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-semibold">Session Access Links</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setNewSession({
                              ...newSession,
                              links: [...newSession.links, { type: "YouTube Live", url: "" }],
                            })
                          }
                          className="border-primary/20 text-primary hover:bg-primary/5 rounded-lg flex items-center space-x-1"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Link</span>
                        </Button>
                      </div>

                      {newSession.links.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic">No links added. Add a link (e.g. YouTube Live, Zoom) for participants to join.</p>
                      ) : (
                        <div className="space-y-2">
                          {newSession.links.map((link, idx) => (
                            <div key={idx} className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-950 p-2 rounded-xl border border-primary/5">
                              <Input
                                placeholder="Link Label (e.g., Join Live)"
                                value={link.type}
                                onChange={(e) => {
                                  const updated = [...newSession.links];
                                  updated[idx].type = e.target.value;
                                  setNewSession({ ...newSession, links: updated });
                                }}
                                className="border-primary/10 rounded-lg focus-visible:ring-primary flex-1 h-9"
                              />
                              <Input
                                placeholder="https://youtube.com/..."
                                value={link.url}
                                onChange={(e) => {
                                  const updated = [...newSession.links];
                                  updated[idx].url = e.target.value;
                                  setNewSession({ ...newSession, links: updated });
                                }}
                                className="border-primary/10 rounded-lg focus-visible:ring-primary flex-[2] h-9"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const updated = newSession.links.filter((_, i) => i !== idx);
                                  setNewSession({ ...newSession, links: updated });
                                }}
                                className="text-destructive hover:bg-destructive/5 rounded-lg h-9 w-9"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 border-t pt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setIsAddingSession(false)}
                        className="rounded-xl border border-zinc-200"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddSession}
                        className="bg-primary hover:bg-primary/95 text-white rounded-xl shadow-md shadow-primary/10 px-6"
                      >
                        Create Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sessions Grid */}
          {sessions.length === 0 ? (
            <Card className="border border-dashed border-primary/20 bg-white/40 dark:bg-zinc-900/40 p-12 text-center rounded-[1.5rem]">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No sessions scheduled</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">Create some meditation sessions so that seekers can join them on the homepage.</p>
              <Button
                onClick={() => setIsAddingSession(true)}
                className="mt-4 bg-primary hover:bg-primary/95 text-white rounded-xl"
              >
                Create Your First Session
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sessions.map((session) => {
                const isEditing = editingSessionId === session._id;
                const IconInfo = iconMapping[session.icon] || { icon: Sparkles, label: "Session" };
                const IconComponent = IconInfo.icon;

                return (
                  <Card
                    key={session._id}
                    className={`border transition-all duration-200 bg-white/90 dark:bg-zinc-900/90 rounded-[1.5rem] overflow-hidden ${
                      isEditing ? "border-primary shadow-xl ring-1 ring-primary/20" : "border-primary/10 hover:border-primary/25 hover:shadow-md"
                    }`}
                  >
                    {!isEditing ? (
                      // SESSION CARD VIEW
                      <CardContent className="p-6 flex flex-col h-full justify-between">
                        <div>
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight">
                                  {session.title}
                                </h3>
                                <span className="text-xs text-primary/80 font-medium">
                                  {IconInfo.label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Time & Date details */}
                          <div className="space-y-2 mb-4 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-primary/5">
                            <div className="flex items-center space-x-2 text-sm text-zinc-700 dark:text-zinc-300">
                              <Calendar className="h-4 w-4 text-primary/70 shrink-0" />
                              <span className="font-medium">{formatDate(session.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-zinc-700 dark:text-zinc-300">
                              <Clock className="h-4 w-4 text-primary/70 shrink-0" />
                              <span>{session.time}</span>
                            </div>
                          </div>

                          {/* Image preview */}
                          {session.imageUrl && (
                            <div className="mb-4 rounded-xl overflow-hidden h-28 border border-zinc-100 dark:border-zinc-800 relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={session.imageUrl}
                                alt={session.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Access Links tags */}
                          {session.links && session.links.length > 0 && (
                            <div className="mb-4">
                              <Label className="text-xs text-zinc-500 font-semibold uppercase block mb-1.5">Join Links</Label>
                              <div className="flex flex-wrap gap-1.5">
                                {session.links.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center space-x-1 bg-primary/10 hover:bg-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-lg border border-primary/10 transition-colors"
                                  >
                                    <span>{link.type}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-2 border-t pt-4 mt-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSession(session._id)}
                            className="text-destructive hover:bg-destructive/5 hover:text-destructive rounded-xl flex items-center space-x-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditingSession(session)}
                            className="border-primary/20 text-primary hover:bg-primary/5 rounded-xl flex items-center space-x-1"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span>Edit Session</span>
                          </Button>
                        </div>
                      </CardContent>
                    ) : (
                      // SESSION CARD EDIT FORM
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="font-bold text-primary">Editing Session</h4>
                          <span className="text-xs font-medium text-zinc-400">Save changes below</span>
                        </div>

                        {/* Edit Inputs */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Title</Label>
                            <Input
                              value={editingSessionData.title}
                              onChange={(e) =>
                                setEditingSessionData({ ...editingSessionData, title: e.target.value })
                              }
                              className="border-primary/20 rounded-xl h-9"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs">Date</Label>
                              <DatePicker
                                selected={editingSessionData.date ? new Date(editingSessionData.date) : null}
                                onSelect={(date) =>
                                  setEditingSessionData({
                                    ...editingSessionData,
                                    date: date ? date.toISOString() : "",
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Time</Label>
                              <TimePicker
                                value={editingSessionData.time}
                                onChange={(time) =>
                                  setEditingSessionData({ ...editingSessionData, time })
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs">Icon Mapped</Label>
                              <select
                                className="w-full p-1.5 border border-primary/20 bg-background rounded-xl text-sm h-9 outline-none"
                                value={editingSessionData.icon}
                                onChange={(e) =>
                                  setEditingSessionData({ ...editingSessionData, icon: e.target.value })
                                }
                              >
                                {Object.entries(iconMapping).map(([key, value]) => (
                                  <option key={key} value={key}>{value.label}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Image URL</Label>
                              <Input
                                value={editingSessionData.imageUrl || ""}
                                onChange={(e) =>
                                  setEditingSessionData({ ...editingSessionData, imageUrl: e.target.value })
                                }
                                className="border-primary/20 rounded-xl h-9 text-xs"
                                placeholder="Image link"
                              />
                            </div>
                          </div>

                          {/* Edit Links inside Session */}
                          <div className="space-y-2 border-t pt-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Session Links</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="xs"
                                onClick={() =>
                                  setEditingSessionData({
                                    ...editingSessionData,
                                    links: [...editingSessionData.links, { type: "Join Live", url: "" }],
                                  })
                                }
                                className="h-6 text-[10px] border-primary/10 text-primary hover:bg-primary/5 rounded-md px-1.5"
                              >
                                + Add Link
                              </Button>
                            </div>

                            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                              {editingSessionData.links.map((link, idx) => (
                                <div key={idx} className="flex gap-1 items-center">
                                  <Input
                                    placeholder="Label"
                                    value={link.type}
                                    onChange={(e) => {
                                      const updated = [...editingSessionData.links];
                                      updated[idx].type = e.target.value;
                                      setEditingSessionData({ ...editingSessionData, links: updated });
                                    }}
                                    className="border-primary/10 rounded-lg h-7 text-xs flex-1 px-2"
                                  />
                                  <Input
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => {
                                      const updated = [...editingSessionData.links];
                                      updated[idx].url = e.target.value;
                                      setEditingSessionData({ ...editingSessionData, links: updated });
                                    }}
                                    className="border-primary/10 rounded-lg h-7 text-xs flex-[2] px-2"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const updated = editingSessionData.links.filter((_, i) => i !== idx);
                                      setEditingSessionData({ ...editingSessionData, links: updated });
                                    }}
                                    className="text-destructive hover:bg-destructive/5 rounded-lg h-7 w-7"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Edit Actions */}
                        <div className="flex justify-end space-x-2 border-t pt-3 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEditingSession}
                            className="rounded-xl border h-8 px-3 text-xs"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateSession(session._id)}
                            className="bg-primary hover:bg-primary/95 text-white rounded-xl h-8 px-4 text-xs flex items-center space-x-1"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>Save Changes</span>
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ---------------- BILINGUAL PAGE CONTENT TAB ---------------- */}
        <TabsContent value="content" className="space-y-6 outline-none">
          <div className="flex justify-between items-center bg-white/60 dark:bg-zinc-900/60 p-4 rounded-2xl border border-primary/10">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Bilingual Page Content</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Edit translations side-by-side. Make changes and click the section save buttons.</p>
            </div>
            <Button
              onClick={handleUpdateScheduleContent}
              className="bg-primary hover:bg-primary/95 text-white flex items-center space-x-2 rounded-xl"
            >
              <Save className="h-4 w-4" />
              <span>Save All Page Content</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Header Content */}
            <Card className="border border-primary/10 shadow-sm bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem]">
              <CardHeader className="border-b border-primary/5 py-4 px-6">
                <CardTitle className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>1. Main Page Headers & Introduction</span>
                </CardTitle>
                <CardDescription>Hero section headings and introductory subtitles</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Heading side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>English Heading</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Input
                      value={scheduleContent.headingEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, headingEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Hindi Heading (साप्ताहिक ध्यान कार्यक्रम)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Input
                      value={scheduleContent.headingHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, headingHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl hindi"
                    />
                  </div>
                </div>

                {/* Subtitle side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>English Subtitle</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.subtitleEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, subtitleEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Hindi Subtitle (हर गुरुवार यूट्यूब...)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.subtitleHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, subtitleHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px] hindi"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Center Info */}
            <Card className="border border-primary/10 shadow-sm bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem]">
              <CardHeader className="border-b border-primary/5 py-4 px-6">
                <CardTitle className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>2. Center & Event Location</span>
                </CardTitle>
                <CardDescription>Details about the meditation ashram location and dates</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Center name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>Center Name (English)</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Input
                      value={scheduleContent.centerNameEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, centerNameEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Center Name (Hindi - सहज योग ध्यान केंद्र)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Input
                      value={scheduleContent.centerNameHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, centerNameHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl hindi"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>English Address</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.addressEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, addressEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Hindi Address (श्री स्वयंभू एकादश...)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.addressHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, addressHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px] hindi"
                    />
                  </div>
                </div>

                {/* Date range text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>Date Range Description (English)</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Input
                      value={scheduleContent.dateRangeEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, dateRangeEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Date Range Description (Hindi - 31 जानेवारी...)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Input
                      value={scheduleContent.dateRangeHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, dateRangeHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl hindi"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Broadcast Details */}
            <Card className="border border-primary/10 shadow-sm bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem]">
              <CardHeader className="border-b border-primary/5 py-4 px-6">
                <CardTitle className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
                  <Youtube className="h-4 w-4 text-primary" />
                  <span>3. YouTube Broadcast & Banner Details</span>
                </CardTitle>
                <CardDescription>Live streaming description, website URLs, and banner texts</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* YouTube Broadcast Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>YouTube Broadcast Description (English)</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.youtubeDescEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, youtubeDescEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>YouTube Broadcast Description (Hindi)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Textarea
                      value={scheduleContent.youtubeDescHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, youtubeDescHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl min-h-[80px] hindi"
                    />
                  </div>
                </div>

                {/* Banner Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between">
                      <span>Bottom Banner Footer (English)</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">EN</span>
                    </Label>
                    <Input
                      value={scheduleContent.bannerTextEn}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, bannerTextEn: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold flex justify-between hindi">
                      <span>Bottom Banner Footer (Hindi)</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">HI</span>
                    </Label>
                    <Input
                      value={scheduleContent.bannerTextHi}
                      onChange={(e) => setScheduleContent({ ...scheduleContent, bannerTextHi: e.target.value })}
                      className="border-primary/15 focus-visible:ring-primary rounded-xl hindi"
                    />
                  </div>
                </div>

                <div className="border-t border-primary/5 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Important External URL Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center space-x-1">
                        <Link2 className="h-3.5 w-3.5 text-primary" />
                        <span>Direct Join Session URL</span>
                      </Label>
                      <Input
                        value={scheduleContent.joinSessionLink}
                        placeholder="https://youtube.com/live/..."
                        onChange={(e) => setScheduleContent({ ...scheduleContent, joinSessionLink: e.target.value })}
                        className="border-primary/15 focus-visible:ring-primary rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center space-x-1">
                        <Globe className="h-3.5 w-3.5 text-primary" />
                        <span>Official Website Link</span>
                      </Label>
                      <Input
                        value={scheduleContent.officialWebsiteUrl}
                        placeholder="https://centerwebsite.com"
                        onChange={(e) => setScheduleContent({ ...scheduleContent, officialWebsiteUrl: e.target.value })}
                        className="border-primary/15 focus-visible:ring-primary rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center space-x-1">
                        <Youtube className="h-3.5 w-3.5 text-primary" />
                        <span>Documentary Video Link</span>
                      </Label>
                      <Input
                        value={scheduleContent.documentaryUrl}
                        placeholder="https://youtu.be/..."
                        onChange={(e) => setScheduleContent({ ...scheduleContent, documentaryUrl: e.target.value })}
                        className="border-primary/15 focus-visible:ring-primary rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end p-2">
              <Button
                onClick={handleUpdateScheduleContent}
                className="bg-primary hover:bg-primary/95 text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                Save All Page Content Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ---------------- ADDITIONAL LINKS & RESOURCES TAB ---------------- */}
        <TabsContent value="resources" className="space-y-6 outline-none">
          <div className="flex justify-between items-center bg-white/60 dark:bg-zinc-900/60 p-4 rounded-2xl border border-primary/10">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Links & Resources</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Configure secondary session links and spiritual files.</p>
            </div>
            <Button
              onClick={handleUpdateAdditionalContent}
              className="bg-primary hover:bg-primary/95 text-white flex items-center space-x-2 rounded-xl"
            >
              <Save className="h-4 w-4" />
              <span>Save Additional Content</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Join Next Session Link Card */}
            <Card className="border border-primary/10 shadow-sm bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem]">
              <CardHeader className="border-b border-primary/5 py-4 px-6">
                <CardTitle className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <span>General Session Link</span>
                </CardTitle>
                <CardDescription>Primary fallback URL used if no specific session join link is specified</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Join Next Session URL</Label>
                  <Input
                    placeholder="https://meet.google.com/... or https://youtube.com/..."
                    value={additionalContent.joinNextSessionLink}
                    onChange={(e) =>
                      setAdditionalContent({
                        ...additionalContent,
                        joinNextSessionLink: e.target.value,
                      })
                    }
                    className="border-primary/15 focus-visible:ring-primary rounded-xl"
                  />
                  <p className="text-xs text-zinc-500 mt-1">This link acts as the default fallback button redirect target on the homepage.</p>
                </div>
              </CardContent>
            </Card>

            {/* Sacred Resources Card */}
            <Card className="border border-primary/10 shadow-sm bg-white/80 dark:bg-zinc-900/80 rounded-[1.5rem] flex flex-col justify-between">
              <div>
                <CardHeader className="border-b border-primary/5 py-4 px-6 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-950 dark:text-zinc-50 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Sacred Resources</span>
                    </CardTitle>
                    <CardDescription>Useful material (currently commented out on home UI, but saved here)</CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAdditionalContent({
                        ...additionalContent,
                        sacredResources: [
                          ...additionalContent.sacredResources,
                          { title: "", icon: "EclipseIcon" },
                        ],
                      })
                    }
                    className="border-primary/20 text-primary hover:bg-primary/5 rounded-lg flex items-center space-x-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Resource</span>
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {additionalContent.sacredResources.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic text-center py-6">No sacred resources added yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {additionalContent.sacredResources.map((resource, index) => (
                        <div key={index} className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-primary/5">
                          <div className="flex-1 space-y-1">
                            <Label className="text-[10px] text-zinc-500 uppercase font-semibold">Title</Label>
                            <Input
                              placeholder="e.g., Shri Ganesha Atharvashirsha"
                              value={resource.title}
                              onChange={(e) => {
                                const updated = [...additionalContent.sacredResources];
                                updated[index].title = e.target.value;
                                setAdditionalContent({ ...additionalContent, sacredResources: updated });
                              }}
                              className="border-primary/10 rounded-lg h-9 text-sm px-2 focus-visible:ring-primary"
                            />
                          </div>
                          <div className="w-[120px] space-y-1">
                            <Label className="text-[10px] text-zinc-500 uppercase font-semibold">Icon</Label>
                            <select
                              className="w-full p-1.5 border border-primary/10 bg-background rounded-lg text-xs h-9 outline-none focus:ring-1 focus:ring-primary"
                              value={resource.icon}
                              onChange={(e) => {
                                const updated = [...additionalContent.sacredResources];
                                updated[index].icon = e.target.value;
                                setAdditionalContent({ ...additionalContent, sacredResources: updated });
                              }}
                            >
                              <option value="EclipseIcon">Morning (Eclipse)</option>
                              <option value="LightbulbIcon">Day (Lightbulb)</option>
                              <option value="BedIcon">Night (Bed)</option>
                            </select>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updated = additionalContent.sacredResources.filter((_, i) => i !== index);
                              setAdditionalContent({ ...additionalContent, sacredResources: updated });
                            }}
                            className="text-destructive hover:bg-destructive/5 rounded-lg h-9 w-9 mt-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>

              <div className="p-6 border-t border-primary/5 bg-zinc-50/50 dark:bg-zinc-950/20 flex justify-end">
                <Button
                  onClick={handleUpdateAdditionalContent}
                  className="bg-primary hover:bg-primary/95 text-white px-6 rounded-xl font-semibold shadow-md shadow-primary/10"
                >
                  Save Resources
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditableSchedule;

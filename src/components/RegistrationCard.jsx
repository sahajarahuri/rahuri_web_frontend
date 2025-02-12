"use client";

import { motion } from "framer-motion";
import { useState } from "react"; // Import useState for managing language state
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RegistrationCard = () => {
  // State to manage language
  const [isHindi, setIsHindi] = useState(false);

  // Function to toggle between English and Hindi
  const toggleLanguage = () => {
    setIsHindi(!isHindi);
  };

  return (
    <section className="w-full" id="registration">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
      <div className="flex w-full items-end justify-end mb-2">
      <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="self-center"
            >
              {isHindi ? "Switch to English" : "हिंदी में देखें"}
            </Button>
      </div>
            <Card className="border-2 border-primary/20 backdrop-blur-sm hindi">
              <CardHeader>
                            {/* Language Toggle Button */}
  
                <CardTitle className="text-2xl font-semibold text-primary">
                  {isHindi
                    ? "प्रकाश और प्रेम के हमारे मिशन का समर्थन करें"
                    : "Support Our Mission of Light and Love"}
                </CardTitle>
                <CardDescription className="font-semibold">
                  {isHindi
                    ? "श्री एकादश रुद्र मुसळवाडी स्थल के विकास में सहभागी बनें और योगदान दें 🙏"
                    : "Participate and contribute to the development of Shri Ekadasha Rudra Musalvadi place."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-muted-foreground">
                  {isHindi
                    ? "आपका योगदान एक पवित्र उद्देश्य को साकार करने में सहायक होगा। यह आध्यात्मिक स्थल न केवल ध्यान, प्रार्थना और आत्मिक शांति का केंद्र बनेगा, बल्कि समाज में प्रेम, करुणा और सद्भाव फैलाने का माध्यम भी होगा।"
                    : "Your contribution will help in realizing a sacred purpose. This spiritual place will not only become a center of meditation, prayer, and spiritual peace, but will also be a medium to spread love, compassion, and harmony in society."}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col space-y-6 w-full max-w-md"
          >
            <Button size="lg" className="w-full py-6 text-lg" asChild>
              <a
                href="https://form.qfixonline.com/rahuriform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                {isHindi ? "अभी दान करें" : "Donate Now"}
              </a>
            </Button>



            <p className="text-sm text-center text-muted-foreground">
              {isHindi
                ? "इस आध्यात्मिक रूप से समृद्ध कार्यक्रम में योगदान दें और आत्म-अन्वेषण की यात्रा पर निकलें।"
                : "Contribute to this spiritually enriching event and embark on a journey of self-discovery."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCard;
import HeroVideoPlayer from "@/components/ui/hero-video-player";

export function Video() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Shri Ekadash Rudra: A Sacred Journey
          </h1>

          <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-8">
            Discover the ancient traditions and spiritual significance of Rahuri
            and the Shri Ekadash Rudra ceremony
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-8">
            <HeroVideoPlayer
              animationStyle="from-center"
              videoSrc="https://youtu.be/SP1gMYwsjIA?si=gCC3hsP0mESZ68pB"
              thumbnailSrc="/images/tumbnail.jpg"
              thumbnailAlt="Everything about Rahuri & Ekadash Rudra"
              className="mb-8"
            />

            <div className="space-y-6 mt-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
                About This Video
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                This comprehensive guide takes you through the sacred traditions
                of Rahuri and the profound significance of the Ekadash Rudra
                ceremony. Learn about the ancient practices, spiritual
                significance, and the transformative power of these sacred
                rituals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

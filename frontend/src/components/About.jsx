import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-100 py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            About Our Recycling Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Building a cleaner, greener future — one step at a time.
          </p>
        </div>
      </section>

      {/* Mission, Vision, and What We Do */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To promote sustainable recycling habits by connecting individuals and communities with trusted recycling centers, enabling smarter waste management and environmental awareness.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            A world where every piece of recyclable waste finds its way back into the production cycle — reducing pollution and conserving natural resources for future generations.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">What We Do</h2>
          <p className="text-gray-600">
            Our platform helps users locate nearby recycling centers, schedule pickups, track their recycling efforts, and earn rewards for eco-friendly behavior.
          </p>
        </div>
      </section>

      {/* Recycling Tips Section */}
      <section className="bg-gray-50 py-16 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
            Simple Tips to Recycle Smarter
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Clean Before You Recycle',
                tip: 'Rinse out containers before placing them in the bin to avoid contamination.',
              },
              {
                title: 'Know What’s Recyclable',
                tip: 'Not all plastics or paper are recyclable. Check your local recycling guide.',
              },
              {
                title: 'Avoid Bagged Recyclables',
                tip: 'Place items directly in the bin — plastic bags can jam sorting machines.',
              },
              {
                title: 'Recycle Electronics Responsibly',
                tip: 'Use e-waste collection centers for batteries, phones, and old gadgets.',
              },
              {
                title: 'Compost Organic Waste',
                tip: 'Food scraps and yard waste can go to compost instead of landfills.',
              },
              {
                title: 'Reduce, Reuse, THEN Recycle',
                tip: 'Cut waste at the source by reusing items before recycling them.',
              },
              {
                title: 'Know Your Local Collection Schedule',
                tip: 'Be aware of your community’s collection days and ensure you set your recyclables out on time.',
              },
              {
                title: 'Avoid Mixing Different Materials',
                tip: 'Separate materials like glass, plastic, and paper to make recycling more efficient.',
              },
              {
                title: 'Recycle Batteries Safely',
                tip: 'Batteries can be hazardous — use designated battery recycling drop-off locations.',
              },
              {
                title: 'Upcycle When Possible',
                tip: 'Get creative and find new uses for old items before deciding to recycle them.',
              },
              {
                title: 'Choose Recycled Products',
                tip: 'Support companies that use recycled materials for their products to reduce demand for virgin resources.',
              },
              {
                title: 'Educate Others About Recycling',
                tip: 'Spread awareness in your community to help others learn about the importance of recycling.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-green-600 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-700 py-16 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg mb-6">
            Whether you're an individual or organization, together we can make the planet cleaner and greener.
          </p>
          <a
            href="/create-request"
            className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-green-100 transition"
          >
            ♻️create Request Now!♻️


          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

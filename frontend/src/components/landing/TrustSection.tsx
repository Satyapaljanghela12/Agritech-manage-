export const TrustSection = () => {
  const partners = [
    { name: 'AgriTech', logo: 'AT' },
    { name: 'FarmCo', logo: 'FC' },
    { name: 'GreenFields', logo: 'GF' },
    { name: 'CropSmart', logo: 'CS' },
    { name: 'HarvestPro', logo: 'HP' },
    { name: 'AgriTech', logo: 'AT' },
    { name: 'FarmCo', logo: 'FC' },
    { name: 'GreenFields', logo: 'GF' },
    { name: 'CropSmart', logo: 'CS' },
    { name: 'HarvestPro', logo: 'HP' },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-gray-600 mb-8 font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Trusted by farmers and agri teams worldwide
        </p>
        
        {/* Infinite Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrolling Content */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 mx-8 flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">{partner.logo}</span>
                  </div>
                  <span
                    className="text-gray-700 font-semibold text-lg whitespace-nowrap"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex animate-scroll">
              {partners.map((partner, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex items-center space-x-3 mx-8 flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">{partner.logo}</span>
                  </div>
                  <span
                    className="text-gray-700 font-semibold text-lg whitespace-nowrap"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



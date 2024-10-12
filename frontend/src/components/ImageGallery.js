import React from 'react';

const ImageGallery = () => {
  const images = [
    { src: 'hotel1.png', title: 'รูปที่ 1' },
    { src: 'hotel2.png', title: 'รูปที่ 2' },
    { src: 'hotel3.png', title: 'รูปที่ 3' },
  ];

  return (
    <div className="flex space-x-14 justify-center p-8">
        {/* อันนี้ที่กดได้ */}
        <div className="flex flex-col items-center">
          <img
            src="hotel1.png"
            className="object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <p className="mt-2 text-center text-gray-700 font-semibold">รูปที่ 1</p>
        </div>







        <div className="flex flex-col items-center">
          <img
            src="hotel2.png"
            className="object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <p className="mt-2 text-center text-gray-700 font-semibold">รูปที่ 2</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="hotel3.png"
            className="object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <p className="mt-2 text-center text-gray-700 font-semibold">รูปที่ 3</p>
        </div>
    </div>
  );
};

export default ImageGallery;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import api from '../axios';

const Rooms = () => {
  const [roomTypes, setRoomTypes] = useState([])
  const [room, setRoom] = useState({})
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = query.get('roomId');
  const checkIn = query.get('checkIn');
  const checkOut = query.get('checkOut');
  const numberOfRoom = query.get('numberOfRoom');
  const numberOfGuests = query.get('numberOfGuests');
  const promotion = query.get('promotion');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/room/getRoomById/${roomId}`)
        setRoom(res.data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    const fetchRoomTypes = async () => {
      try {
        const res = await api.get(`/roomTypes/getRoomTypesByRoomId/${roomId}`)
        setRoomTypes(res.data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchRoom()
    fetchRoomTypes()
  }, [roomId])

  return (
    <div
      style={{
        backgroundImage: `url(${room.imageInRoomTypes})`,
        backgroundPosition: '50% 0%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
      className='pb-6'
    >
      <nav className={`w-full bg-transparent mx-auto flex items-center ${room.id === 1 ? 'text-white' : 'text-black'} shadow-xl p-2`}>
        <Link className='overflow-hidden' to="/">
          <img className={`h-[120px] w-[auto] max-w-[100%] object-contain ${room.id === 1 ? 'transform scale-150' : ''}`} src={room.logo} alt='roomLogo' />
        </Link>
        <div className='ml-4'>
          <p>วันเดินทาง</p>
          <div className='flex'>
            <p>{checkIn}</p>
            <p>-</p>
            <p>{checkOut}</p>
          </div>
        </div>
        {numberOfRoom && (
          <div className='ml-10'>
            <p>จำนวนห้อง</p>
          <p>{numberOfRoom}</p>
        </div>
        )}
        <div className='ml-10'>
          <p>จำนวนคน</p>
          <p>{numberOfGuests}</p>
        </div>
        <div className='ml-10'>
          <p>รหัสโปรโมชั่น</p>
          <p>{promotion || '-'}</p>
        </div>
      </nav>
      <div className='max-w-[1200px] w-[90%] mx-auto flex flex-col gap-5 mt-10'>
        {
          roomTypes.map((roomType) => (
            <RoomCard 
              roomId={room.id}
              roomTypeId={roomType.id}
              type={roomType.type} 
              image={roomType.image}
              price={roomType.price}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Rooms;
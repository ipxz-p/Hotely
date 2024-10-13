import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#20231f] flex p-6 text-sm text-[#f0eae0]">
        <div className="flex-shrink-0 w-[30%]">
          <h1>TOSCANA VALLEY</h1>
          <div className="text-[#8c8e90] mt-4">
            <p>2 หมู่ที่ 11 บ้านเนินทอง</p>
            <p>ต.โป่งตาลอง อ.ปากช่อง</p>
            <p>จ.นครราชสีมา 30450</p>
          </div>
        </div>
        <div className="w-full pl-[6%]">
          <p className="text-[#8c8e90]">โซเชียล</p>
          <div className="flex flex-col gap-2 mt-2">
            <div>
              <a
                className="hover:text-[#db8056]"
                href="https://www.instagram.com/toscanavalley/"
                target="_blank"
                rel="noopener noreferrer"
              >
                อินสตาแกรม
              </a>
            </div>
            <div>
              <a
                className="hover:text-[#db8056]"
                href="https://www.facebook.com/ToscanaValley"
                target="_blank"
                rel="noopener noreferrer"
              >
                เฟสบุ๊ค
              </a>
            </div>
            <div>
              <a
                className="hover:text-[#db8056]"
                href="https://www.tiktok.com/@toscanavalley.khaoyai"
                target="_blank"
                rel="noopener noreferrer"
              >
                ติ๊กต๊อก
              </a>
            </div>
            <div>
              <a
                className="hover:text-[#db8056]"
                href="https://www.youtube.com/channel/UC-0pjQZipG2Zo0n3X-OkilA"
                target="_blank"
                rel="noopener noreferrer"
              >
                ยูทูป
              </a>
            </div>
            <div>
              <a
                className="hover:text-[#db8056]"
                href="https://page.line.me/fth9380c?openQrModal=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                ไลน์
              </a>
            </div>
          </div>
        </div>
        <div className="w-full pl-[6%]">
          <p className="text-[#8c8e90]">ลิงค์</p>
          <div className="flex flex-col gap-2 mt-2">
            <p className="hover:text-[#db8056] w-fit cursor-pointer">กิจกรรม</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer cursor-pointer">สปา</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer cursor-pointer">อีเวนท์</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer cursor-pointer">ตรวจสอบเส้นทาง</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer cursor-pointer">ข่าวสารของทอสกานา</p>
          </div>
        </div>
        <div className="w-full pl-[6%]">
          <p className="text-[#8c8e90]">ติดต่อ</p>
          <div className="flex flex-col gap-2 mt-2">
            <p className="hover:text-[#db8056] w-fit cursor-pointer">ติดต่อเรา</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer">รับสมัครงาน</p>
            <p className="hover:text-[#db8056] w-fit cursor-pointer">นโยบายคุ้มครองข้อมูลส่วนบุคคล</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-black text-center text-[#8d8d8d]">
        <p>&copy; Toscana Valley 2023</p>
      </div>
    </div>
  );
};

export default Footer;

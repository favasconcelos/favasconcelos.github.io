import IMG_1 from "@/assets/photos/01.jpg";
import IMG_2 from "@/assets/photos/02.jpg";
import IMG_3 from "@/assets/photos/03.jpg";

const PHOTOS = [IMG_1, IMG_2, IMG_3];

export default function Photos() {
  return (
    <div className="hidden md:flex flex-row gap-2 max-h-[180px]">
      {PHOTOS.map((photo, i) => {
        const key = `photo-${i}`;
        return (
          <img key={key} src={photo} alt="Photos" className="flex-1 w-0 object-cover" />
        );
      })}
    </div>
  );
}

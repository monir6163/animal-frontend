import Image from "next/image";

export default function Animal({ items }: any) {
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {items?.map((item: any) => (
          <div key={item._id} className="flex flex-col items-center">
            <Image
              src={item?.animal_avatar?.url}
              alt={item?.name}
              width={160}
              height={190}
              className="w-full object-cover"
              priority={true}
            />
            <p className="text-white text-lg text-center mt-1 font-normal">
              {item?.name.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

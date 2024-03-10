export default function Skeleton({ times: number = 1 }) {
  const skeleton = (
    <div className="rounded-xl bg-gray-300 animate-pulse h-32  max-w-[700px]">
      <div className="flex flex-col gap-3 py-3 px-3">
        <div className="rounded-full w-[50%] border-2 border-white h-5"></div>
        <div className="rounded-full w-[70%] border-2 border-white h-5"></div>
        <div className="rounded-full w-[30%] border-2 border-white h-5"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8  py-8">
      {Array.from({ length: number }).map((_, index) => (
        <div key={index}>{skeleton}</div>
      ))}
    </div>
  );
}

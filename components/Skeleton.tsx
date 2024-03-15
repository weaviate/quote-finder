export default function Skeleton({ times: number = 1 }) {
  const skeleton = (
    <div className="rounded-xl animate-pulse h-32  max-w-[700px] flex flex-row items-center">
      <div className="rounded-full  size-20 shrink-0 w-20 m-3  bg-black opacity-10 border-2"></div>
      <div className="flex flex-col gap-3 py-3 px-3 w-full">
        <div className="rounded-full w-[50%] border-2 bg-black opacity-10 h-5"></div>
        <div className="rounded-full w-[70%] border-2 bg-black opacity-10 h-5"></div>
        <div className="rounded-full w-[30%] border-2 bg-black opacity-10 h-5"></div>
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

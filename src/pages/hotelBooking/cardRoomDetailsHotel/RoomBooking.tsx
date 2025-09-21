import { Button } from "@/components/ui/button";

function RoomBooking({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="my-5 border-t">
      <h3 className="text-2xl font-semibold my-7 text-primary text-center">
        Book Hotel
      </h3>
      <div>
        <p className="text-xl font-[500] mb-2">Check In</p>
        <ul className="w-md mb-5 grid grid-flow-col gap-4 overflow-x-auto text-center px-2">
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-white bg-[--check]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
          <li className="flex-1 min-w-[150px] border px-10 py-3 rounded-[10rem] text-black bg-[#F3F4F6]">
            <p className="mb-1 text-[14px]">Today</p>
            <p>4 Oct</p>
          </li>
        </ul>
      </div>
      <p className="text-lg mb-3">Note To Owner</p>
      <textarea
        value=""
        onChange={() => {}}
        className="border p-3 bg-[#F3F4F6] rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#202a3e]"
        placeholder="Enter here..."
      />
      <Button
        onClick={() => setActiveTab("bookingNow")}
        className="w-full  py-3 rounded-lg mt-6 hover:opacity-90 transition"
      >
        Continue
      </Button>
    </div>
  );
}

export default RoomBooking;

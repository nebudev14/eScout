export const ManagePitScout: React.FC<{ teamNum: number }> = ({ teamNum }) => {
  return (
    <div>
      <h1 className="my-4 text-2xl">
        <b>Pit Scouts</b>
      </h1>
      <button
        className="px-6 py-2 mt-3 mb-6 text-sm text-white duration-200 rounded-md bg-cyan-500 hover:bg-cyan-600"
        // onClick={() => setIsOpen(true)}
      >
        Create
      </button>
    </div>
  );
};

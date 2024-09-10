interface GridTableProps {
  gridData: string[][];
}

export const GridTable = ({ gridData }: GridTableProps) => {
  return (
    <div className="flex flex-col">
      {gridData.map((row, rowI) => (
        <div key={`row-${rowI}`} className="flex">
          {row.map((col, colI) => (
            <div
              key={`col-${rowI}-${colI}`}
              className="w-12 h-12 flex justify-center items-center border border-green-200"
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

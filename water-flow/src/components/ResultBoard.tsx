interface ResultBoardProps {
  results: number[][];
}

export const ResultBoard = ({results}: ResultBoardProps) => {
  return (
    <div className="w-full px-6 py-2 rounded-lg border border-gray-500 bg-gray-300/50">
      {results.length ? 
        <div className="w-full max-w-full overflow-hidden flex flex-wrap gap-4">
          {
            results.map((item, index) => 
            <span key={index}>{`(${item[0]}, ${item[1]})`}</span>)
          }
          </div>:"No Data"
      }
    </div>
  )
}
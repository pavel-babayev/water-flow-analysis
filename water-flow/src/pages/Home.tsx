import { useCallback, useEffect, useState } from "react";
import { Tab } from "../types";
import { getGridData, getQualifyingCells, getTabs } from "../apis";
import { GridTable, ResultBoard, TabList } from "../components";
import { tab } from "@testing-library/user-event/dist/tab";

export const Home = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [results, setResults] = useState<number[][]>([]);
  const [gId, setGId] = useState(-1);

  useEffect(() => {
    getTabs().then((data) => {
      setTabs(
        data.map((item: Array<string | number>) => ({
          tabName: item[0],
          gId: item[1],
        }))
      );
    });
  }, []);

  const selectTab = useCallback((gId: number) => {
    getGridData(gId).then((data) => {
      setGridData(data);
      setGId(gId);
      setResults([]);
    });
  }, []);

  const getResults = () => {
    getQualifyingCells(gId).then((data) => {
      setResults(data);
    });
  };

  return (
    <div className="rounded-xl shadow-xl bg-white flex gap-4 py-4 px-6">
      <TabList tabs={tabs} selectTab={selectTab} />
      <div className="px-6 w-[500px] flex flex-col items-center gap-6">
        {gId >= 0 && (
          <>
            <div className="w-full flex justify-end">
              <button
                className="py-2 px-4 rounded-md bg-purple-500 text-white font-bold"
                onClick={getResults}
              >
                Get Result
              </button>
            </div>
            <div>
              <span className="font-semibold">Water Table:</span>
              <GridTable gridData={gridData} />
            </div>
            <div className="w-full">
              <span className="font-semibold">Results:</span>
              <ResultBoard results={results} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

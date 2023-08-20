"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type Label = {
  locker_number: number;
  label_id: string;
  physical_id: string;
  cost: number | null;
};

const baseURL = "http://localhost:8000";

export default function Home() {
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/api/v1/label`,
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      setLabels([...response.data]);
    });
  }, []);

  const [labels, setLabels] = useState<Label[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex w-screen bg-sky-400 text-white h-20 items-center">
        <div className="text-2xl pl-6">Dashboard</div>
      </div>
      <div className="flex w-screen flex-row flex-1 bg-zinc-100">
        <div className="flex flex-col bg-white shadow-md w-96 rounded-md m-4">
          <div className="text-center py-4 border-b-2">
            Customer spending information
          </div>
          {labels.map((v) =>
            v.cost !== null ? (
              <Label
                locker={v.locker_number}
                labelId={v.label_id}
                cost={v.cost}
                key={v.label_id}
              ></Label>
            ) : null
          )}
        </div>
      </div>
    </main>
  );
}

interface LabelProps {
  locker: number;
  labelId: string;
  cost: number;
}

function Label(props: LabelProps) {
  const { locker, cost, labelId } = props;

  const requestFind = useCallback(() => {
    axios({
      method: "patch",
      url: `${baseURL}/api/v1/label/${labelId}`,
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
    });
  }, [labelId]);
  return (
    <div className="flex flex-row border-b items-center">
      <div className="flex flex-1 pb-8 pt-4 pl-4 gap-2">
        <div className="font-bold">{locker}</div>
        <div className="flex-1"></div>
        <div
          className="rounded-full bg-red-600 text-white text-sm items-center px-6 py align-middle h-min cursor-pointer"
          onClick={() => {requestFind()}}
        >
          find
        </div>
      </div>
      <div className="flex justify-center px-4">{cost} KRW</div>
    </div>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  stopDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setToNullActiveCycleId: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  stopCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === "ADD_NEW_CYCLE") {
      return [...state, action.payload.newCycle];
    }

    return state;
  }, []);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  }

  function setToNullActiveCycleId() {
    setActiveCycleId(null);
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    // setCycles((state) => [...state, newCycle]);
    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  }

  function stopCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, stopDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });

    setActiveCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setToNullActiveCycleId,
        setSecondsPassed,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

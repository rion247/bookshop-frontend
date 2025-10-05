import { type ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-80 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      {children}
    </div>
  );
};

export default Container;

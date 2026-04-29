import React, { Suspense, lazy } from "react";

const MapTest = lazy(() => import("../../components/MapTest"));

const Page = () => {
  return (
    <Suspense fallback={<div>Loading map…</div>}>
      <MapTest />
    </Suspense>
  );
};

export default Page;

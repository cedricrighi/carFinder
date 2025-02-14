import HomeImage from "../components/HomeImage";
import LastVehiclesAdded from "../components/LastVehiclesAdded";
import Navbar from "../components/Navbar";
import SignUpNewsInfos from "../components/SignUpNewsInfos";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeImage />
      {/* <Categories /> */}
      <LastVehiclesAdded />
      <SignUpNewsInfos />
    </>
  );
}

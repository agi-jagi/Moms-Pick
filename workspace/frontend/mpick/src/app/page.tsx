import Test from "./test";
import Provider from "./Provider";

export default function Home() {
  return (
    <div>
      <Provider>
        <Test />
      </Provider>
    </div>
  );
}

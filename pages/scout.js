import Protected from "../components/Protected";

export default function Scout() {
  return (
    <>
      <Protected>
          <form className="flex items-center justify-center h-screen">
              <div className="flex flex-row items-center justify-center text-xl">
                  <select className="p-3 rounded-l-lg"> 
                      <option value="Qualification">Qualification</option>
                      <option value="Quarterfinal">Quarterfinal</option>
                      <option value="Semifinal">Semifinal</option>
                      <option value="Final">Final</option>
                  </select>
                  <input className="p-3 rounded-r-lg"></input>
              </div>
          </form>
      </Protected>
    </>
  );
}

// import { createRouter } from "../create-router";
// import { string, z } from "zod";

// interface ResponeData {
//   alliances: Alliances;
// }

// interface Alliances {
//   red: Team;
//   blue: Team;
// }

// interface Team {
//   team_key: string;
//   xs: number[];
//   ys: number[];
// }

// export const zebraRouter = createRouter()
//   .query("get-match-data", {
//     input: z.object({
//       matchId: z.string(),
//       teamNumber: z.string(),
//       color: z.string()

//     }),
//     async resolve({ input, ctx }) {
//       var url = 'https://www.thebluealliance.com/api/v3/match/' + input.matchId + '/zebra_motionworks';
//       return await fetch(
//         url,
//         {
//           method: 'GET',
//           headers: {
//             'X-TBA-Auth-Key':'',
//             'Content-Type': 'application/json'
//           }
//         }
//       ).then((response) => response.json())
//       .then((data: any) => data.alliances[input.color].filter((e: any) => e.team_key === "frc" + input.teamNumber))
//     }
//   })
export function hello() {
  console.log("")
}
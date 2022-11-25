# eScout

eScout is a web app designed for FRC scouting and strategy, and is available to all FRC teams to use.

*eScout is currently under active development, and is projected to be fully ready for release by the beginning of the 2023 season.*

## Why eScout?

Strategy is a major part of FRC, and has the potential to strongly alter the outcome of your team's matches depending on its effectiveness. 

However, strategy is not a thing that is easily jumped into. Scouting matches on paper can be tedious, and identifying statistics and trends within your data is easier said than done.

eScout aims to provide all these features right out of the box for all FRC teams. With intuitive scouting UIs, pre-made graphs, built-in pit scouting functionality, and many more, eScout provides your team with the tools necessary to kickstart and maximize your team's strategy experience.

## Contributing

Unfortunately, contributions to eScout are not being accepted until it is out of its testing phase. However, please feel free to request features/report bugs by leaving an issue on this repository!

## Additional implementation details

Behind the scenes, eScout runs using [Next.Js](https://nextjs.org/) and [tRPC](https://trpc.io/), and is hosted on [Vercel](https://vercel.com/). Scouting data is stored in a PostgreSQL database, fetched using [Prisma](https://www.prisma.io/).
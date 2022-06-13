# Challenge Intro

Welcome to the CIQ front-end skills test! The purpose of this test is to help our team gauge your knowledge, skills, and proficiency in accomplishing front-end development tasks.

**You are only expected to spend 1-2 hours on this test, and it is not required that you finish every user story.** It is up to your judgement which stories to prioritize or focus on in order to best showcase your skills.

The scenario for this test is that you are building a viewing dashboard for server access logs. The file `data/server_log.json` contains the log entries, which should be accessed via the http://localhost:3000/api/logs API endpoint (which has a handler defined in `pages/api/logs.ts`). The `.json` file should be treated as an external data source (not modified), but the API handler can be modified however you wish.

You may use whatever styling method you are most comfortable with. The CSS module styling is only present due to it being part of the Next.js template. You may use CSS modules or replace it with your preferred styling method.

## User Stories

-  As a user, I want to view the access logs of the server.
-  As a user, I want to find out how many unique users have accessed the server.
-  As a user, I want to find out how many uploads larger than a specified size have happened.
-  As a user, I want to view a summary of a user's interactions with the server within a specified time frame

## Extra Credit

-  Complete the `ServerLogEntry` type in `models/ServerLogEntry.ts`
-  Ensure all variables in your code are fully and correctly typed

# Getting Started

First, install dependencies:

```bash
npm install
# or
yarn
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/logs](http://localhost:3000/api/logs). This endpoint can be edited in `pages/api/logs.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Your Notes

This space is intended for you to provide some insight into your thought process and approach.

I opted to take the approach of folding together the different filtering requests in the story into a unified approach that allows for file size, user, and date filtering of a single log table.

In a realworld situation, I would prefer to brainstorm this and ensure this approach was sufficient. The drawbacks here are that we limit things to a single view. It could be useful to create a more "summary" style situation that shows stats at a glance for a user as was referenced in the story.

One of my usual practices is to encapsulate state/state operations/effects into a hook and only export from that hook what's actually needed in the UI/JSX code. I did this with the `useDashboard` hook. I find it keeps the modules tidy and keeps components cleaner to read through.

## Assumptions

What assumptions did you make while completing the test? Were there any questions you would have asked in a real-world scenario?

-  I assumed the files sizes are in kb by I would definitely want to follow up on that.
-  I assumed it would be ok to include this all on one page.
-  I assumed that it would be ok to combine all the story "filters" into a single page that has all the features available.

## Thoughts

If you'd like to share any high-level thoughts or explain any decisions, feel free!

-  I added the `"noImplicitAny": false` to the tsconfig b/c returning the Chakra provider component from \_app.tsx was either not matching the `AppProps` type or if I removed the casting to `AppProps` than it was complaining about implicit any's. I would prefer to more carefully understand what's happening here in a production project, but for now I am ok with disabling that check in the tsconfig.
-  I opted for Chakra UI as I have used it in the past and find it quick for prototyping due to how easily you can customize styles inline using tailwind-esque attributes on a component.
-  I wanted to create a single page that fulfilled all the stories. This was so that I could provide all the features in one place.
-  I turned off strict null checks as that's been a standard setting for me to flip. I prefer being able to at times initialize a string or number as null.

## Improvements / Scaling

Given more time, what would you change to make things production ready or add that next level of polish?

-  I really didn't want to use moment js, but given the odd format of the timestamp (at least odd to me), I felt most comfortable using moment as it's been the library in my current repo for years and I didn't want to mess up parsing the date from UTC to local with a library I have less experience with. Without time constraints, I would prefer to use daysjs or date-fns, but I have a ton of experience with moment so it made things simpler for this test.
-  I would like to implement table sorting and some better ways of filtering the table. Also paging could be helpful. The amount of data on the page is perhaps too long to be useful.
-  I disabled typing in the date inputs as that would require more refined state/validation handling. In chrome at least, there's a nice UI for picking a date. I'd want to change the state/validation handling to accomodate keyboard usage. My preference with inputs is to allow the user to type freely and have the UI update when it's "ready" -- as in, validated, and done typing. This can be a moving target depending on use case.
-  Overall layout is a bit rough and quick. I would want to iterate the UI to make it feel a bit more cohesive and, for lack of a better word, pretty.
-  I would prefer to have the datepicker UI in a separate component but I did not have enough time to refactor that piece. As a matter of aesthetics, I encapsulated it into a variable within the component body. I would prefer a separate component in it's own module.
-  There's some warnings about a `useMemo` dependancy array that I would want to take a look at optimizing as well.

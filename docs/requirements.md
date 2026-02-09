Functional Requirements:

As a group member, I want to receive activity suggestions based on our meeting time, so we don’t have to waste time debating what to do.

If the overlap is at night on a day like Friday, the system suggests “Movies” or “Video Games”

If the overlap is in the afternoon, the system suggests “Study Together” as one of the options.

As a group member, I want to be able to paste my availability in natural language (e.g, I am free Thursday after 3:30 PM), so I don’t have to click boxes manually on a grid. 

Interface provides a text box area for natural language input

Users can see a confirmation view of the parsed time before submitting it to the database.


Non-Functional Requirements:

Standard API endpoints have to respond in under 200 ms (milliseconds).

Ollama parsing for natural language schedules must be completed in under 5 seconds.

Schedules are stored up until the event planning & day is over, then automatically purged from PostgreSQL.


AI-specific requirements:

If the natural language parsing step fails, the Interface must degrade to a manual selector for times, so the user is not restricted.

The backend must have a hard timeout of 10 seconds. If Ollama can not return a parsed schedule with that time constraint, it must abort its process and ask the user to input time manually.


Prioritization:

MUST -> Create a Group, Manual Schedule Input, Algorithm to calculate and display time overlaps

SHOULD -> Natural Language Processing with Ollama

NICE TO HAVE -> AI activity suggestions dependent on time of day, time of year, weather, etc. User Accounts/Authentication

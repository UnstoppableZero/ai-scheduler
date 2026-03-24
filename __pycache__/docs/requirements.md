Functional Requirements:

As a surgical coordinator or nurse, I want the system to estimate the return time of equipment based on when it was signed out, so I don't have to guess when it will be available.

- If a C-Arm X-ray is signed out at 8:00 AM, the system defaults to an estimated "In Field" duration based on standard procedure times (e.g., 4 hours).

- If the equipment is marked as "returned" on the sheet, the system immediately updates its status to "Available."


As a hospital staff member, I want to be able to upload a photo of the physical sign-out sheet, so I don't have to manually type in equipment IDs, names, and timestamps into a database.

- The interface provides a mobile-responsive camera/upload zone.

- Users see a confirmation view of the AI-parsed data (Who, What, When, Where) to quickly verify or correct any OCR mistakes before submitting it to the database.


Non-Functional Requirements:

- Standard FastAPI endpoints (fetching the dashboard heatmap, updating basic text fields) must respond in under 200 ms.

- Ollama multimodal parsing (extracting handwriting from the image to JSON) must be completed in under 8-10 seconds.

- Completed equipment cycles (signed out -> returned) are moved from the "Active" dashboard to an "Archived History" table in PostgreSQL for auditing, rather than being deleted.

AI-Specific Requirements:

- If the visual parsing step fails (e.g., the photo is too blurry or handwriting is completely illegible), the interface must gracefully degrade to a manual input form so the user is not blocked from updating the equipment status.

- The backend must have a hard timeout of 15 seconds for the image processing. If the Ollama vision model cannot return a parsed JSON object within that constraint, FastAPI must abort the process and prompt the user to input the data manually.


Prioritization:

- MUST -> Mobile "Snap & Sync" image upload UI, Ollama vision extraction (Image-to-JSON), PostgreSQL database integration, and a live "Dashboard" displaying current equipment locations.

- SHOULD -> Estimated Time of Return (ETA) predictions based on the equipment type, and a "Conflict Alert" if the same machine is signed out to two different rooms simultaneously.

- NICE TO HAVE -> User Accounts/Authentication (e.g., standard Nurse vs. Admin views), and automated SMS/Dashboard alerts if a piece of equipment has been "In Field" for over 12 hours without a return signature.

# Security Specification for EdTech

## Data Invariants
1. A user can only read their own private profile data.
2. Only authenticated users can enroll in courses.
3. Course data is public for reading but protected for writing.
4. An enrollment must have a valid userId matching the requester.

## The "Dirty Dozen" Payloads (Blocked)
1. Creating a user profile with `role: 'admin'`.
2. Updating someone else's user profile.
3. Creating an enrollment for a different user.
4. Deleting a course from the catalog.
5. Injected script in course description.
6. Massive string in course title.
7. Spoofing `userId` in enrollment to bypass payment or limits.
8. Updating `price` of a course.
9. Enrolling while unauthenticated.
10. Reading another user's email from their private profile.
11. Circular dependency in enrollments.
12. Attempting to write to system-only fields.

## Test Runner
The firestore.rules.test.ts will verify these rejections.

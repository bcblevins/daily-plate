## Short term TODOs

- TODO: Start UI design plan
- ~~TODO: Add buttons to navigate between days on home screen~~
    ~~- Changing date does not update food list. useEffect dependency problem?~~





## ROUTES:
- Home (show daily overview, most recent few foods eaten, nav)
- FoodSearch (Search and select food to eat)
- EatFood (Log food with amount eaten)
- UserPrefs (Goals, metrics, settings)
- UserFoods (See/edit custom foods)
- DailySummary
- RecipeBuilder
- Stats

## Long term TODOs:
- Plan system for food rec's
- Plan system for stats
- Getting logged out on reload or address bar navigation
  - Session info being saved to storage, but erased on reload. No idea why
  - Learn how supabase manages tokens
    - After signing in, token and refresh token returned. Token expires quickly, refresh token can be used exactly 1 time to refresh session and recieve new token/refresh token.
  - Learn how auth is normally done in React without a helper API
  - Refresh memory of best practices
  - Manually implement persistent session.

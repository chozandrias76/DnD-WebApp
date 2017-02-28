## Stuff to Do

1. ~~Split the `Character` component into `AddCharacter` `EditCharacter` and `CharacterList`~~
1. ~~Get rid of top-level variable `currentCharacterGUID`. Components that need access to the character GUID (just the `EditCharacter` component, I think) should read it from `props`, which I believe is provided by the React Router (since it's in the URL)~~
1. ~~After creating a new character, use the React Router to change to a new route (the one that displays the `EditCharacter` screen).~~
1. ~~Create a character GUID only when saving a character for the first time~~
1. ~~Replace the multiple `<Form>` components with a single, top-level `<Form>` component~~
1. ~~Save to `LocalStorage` only when the user clicks the save button (whether in edit or new-character mode)~~

Things to add to this:

1. Move all of the inlined CSS into your SCSS files
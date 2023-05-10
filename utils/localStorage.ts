export function getItemFromLocalStorage(key:string) {
   try {
      const stringValue = localStorage.getItem(key);
      if(stringValue !== null) {
         return JSON.parse(stringValue);
      } else {
         return null;
      }
   } catch (error) {
      console.error("Error getting item from local storage", error);
   }
}
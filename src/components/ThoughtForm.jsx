export const ThoughtForm = () => {
  return (

      <form>
        <label htmlFor="happy-thought" className="block text-gray-800 font-semibold mb-2">
          What's making you happy right now?
        </label>
        <textarea
          id="happy-thought"
          rows="2"
 
          placeholder="React is making me happy!"
        />
         <button
            type="submit"

            className="send-button"

          >
            ❤️ Send Happy Thought ❤️
          </button> 
      </form>

  );
};
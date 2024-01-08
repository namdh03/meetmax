export default function generateKeyword(keyword: string): string[] {
    // Split the keyword into an array of words and remove any empty strings
    const name: string[] = keyword.split(" ").filter((word) => word);

    // Create a boolean array to keep track of whether a word has been used in a permutation
    const flagArray: boolean[] = new Array(name.length).fill(false);

    // Create an array to store the current permutation
    const result: string[] = new Array(name.length).fill("");

    // Create an empty array to store the generated keywords
    const stringArray: string[] = [];

    // Function to create all possible substrings from a given word
    const createKeywords = (name: string): string[] => {
        const arrName: string[] = [];
        let curName = "";
        name.split("").forEach((letter) => {
            curName += letter;
            arrName.push(curName.toLowerCase());
        });
        return arrName;
    };

    // Recursive function to find all permutations of the words
    function findPermutation(k: number): void {
        for (let i = 0; i < name.length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                // If all words have been used in the permutation, add it to the stringArray
                if (k === name.length - 1) {
                    stringArray.push(result.join(" "));
                }

                // Recursively find the next word for the permutation
                findPermutation(k + 1);

                // Reset the flag for the current word to allow it to be used in other permutations
                flagArray[i] = false;
            }
        }
    }

    // Start the permutation process from the first word
    findPermutation(0);

    // Reduce the generated permutations into individual keywords
    return stringArray.reduce<string[]>((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);
}

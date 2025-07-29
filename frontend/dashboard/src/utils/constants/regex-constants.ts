// ^: Asserts the start of the string.
// -?: Makes the minus sign optional, allowing for negative numbers.
// \d+: Matches one or more digits.
// (\.\d+)?: This is an optional group that matches a decimal point followed by one or more digits. This allows for decimal numbers.
// $: Asserts the end of the string.
export const regex_decimal = /^-?\d+(\.\d+)?$/;

// ^: Asserts the start of the string.
// -?: Makes the minus sign optional, allowing for negative numbers.
// \d+: Matches one or more digits for the integer part.
// $: Asserts the end of the string.
export const regex_integer = /^-?\d+$/;

// ^ asserts the start of the string.
// \d matches any digit character (equivalent to [0-9]).
// + quantifier matches one or more occurrences of the preceding element (in this case, \d, meaning one or more digits).
// $ asserts the end of the string.
export const regex_digit_only = /^\d+$/;

// : Asserts the start of the string.
// \D+: Matches one or more non-digit characters.
// $: Asserts the end of the string.
export const regex_non_digit_string = /^\D+$/;

// ^: asserts the start of the string.
// .{0,200}: matches any character (.) between 0 and 200 times ({0,200}).
// $: asserts the end of the string.
export const regex_description = /^.{3,200}$/;

// ^: Asserts the start of the string.
// \D+: Matches one or more non-digit characters.

// ^: Asserts the start of the string.
// [a-zA-Z]+: Matches one or more occurrences of any uppercase or lowercase letter.
// $: Asserts the end of the string.
export const regex_alphabet = /^[a-zA-Z]+$/;

// ^: Asserts the start of the string.
// [a-zA-Z ]+: Matches one or more occurrences of any uppercase or lowercase letter and space.
// $: Asserts the end of the string.
export const regex_alphabet_with_space = /^[a-zA-Z ]+$/;

// ^: Asserts the start of the string.
// [a-zA-Z ]: Matches any alphabet character (uppercase or lowercase) or space.
// {3,100}: Specifies that there should be at least 3 and at most 100 occurrences of the preceding character class.
// $: Asserts the end of the string.
export const regex_alphabet_with_space_minmax = (min: number, max: number) =>
  new RegExp(`^[a-zA-Z ]{${min},${max}}$`);

// ^: Asserts the start of the string.
// [^\s@]+: Matches one or more characters that are not whitespace or '@'.
// @: Matches the '@' symbol.
// [^\s@]+: Matches one or more characters that are not whitespace or '@'.
// \.: Matches the dot (.) character.
// [^\s@]+: Matches one or more characters that are not whitespace or '@'.
// $: Asserts the end of the string.
export const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ^[^\\s@]{${min},${max}} ensures that the part before the '@' symbol has a minimum length of min characters and a maximum length of max characters, excluding whitespace and '@' characters.

// @([^.]+\\.)+ matches the domain part of the email address, ensuring it has at least one dot (for example, example.com).

// [^\\s@]{2,}$ specifies that the part after the '@' symbol (domain extension) should have at least 2 characters and can be of any length after that, excluding whitespace and '@' characters.
export const regex_email_minmax = (min: number, max: number) =>
  new RegExp(`^[^\\s@]{${min},${max}}@([^.]+\\.)+[^\\s@]{2,}$`);
// ^: Asserts the start of the string.
// [^\s@]{3,30}: Matches between 3 and 30 characters that are not whitespace or '@' for the local part.
// @: Matches the '@' symbol.
// ([^\s@]+\.)+: Matches one or more occurrences of non-whitespace characters followed by a dot for the domain part.
// [^\s@]{2,20}: Matches between 2 and 20 characters that are not whitespace or '@' for the top-level domain.
// $: Asserts the end of the string.

// export const regex_email_minmax = (min: number, max: number) =>
// new RegExp(`^[^\\s@]+@([^.]+\\.)+[^\\s@]{${min},${max}}$`);

// ^: Asserts the start of the string.
// \\d: Represents a digit (0-9). The double backslash \\ is used to escape the backslash, as the backslash is a special character in many programming languages, and escaping it allows us to represent a literal backslash.
// {${num}}: This is a quantifier, where ${num} is a placeholder for a variable that specifies the exact number of preceding digits to match. The actual value of num would be substituted when using the regular expression. For example, if num is 3, it would match exactly three digits.
// $: Asserts the end of the string.
export const regex_number_input = (num: number) => new RegExp(`^\\d{${num}}$`);

// ^ asserts the start of the string.
// \d+ matches one or more digits (integer part of the price).
// (\.\d{2})? is an optional group that matches a decimal point followed by exactly two digits (decimal part of the price). The ? makes this group optional, allowing prices without a decimal part.
// $ asserts the end of the string.
export const regex_price = /^\d+(\.\d{2})?$/;

// ^: Asserts the start of the string.
// (?=.*[a-z]): Positive lookahead to ensure the string contains at least one lowercase letter.
// (?=.*[A-Z]): Positive lookahead to ensure the string contains at least one uppercase letter.
// (?=.*\d): Positive lookahead to ensure the string contains at least one digit.
// (?=.*[@$!%*?&]): Positive lookahead to ensure the string contains at least one special character from the set [@$!%*?&].
// [A-Za-z\d@$!%*?&]{8,10}: Matches a sequence of characters (letters, digits, or specified special characters) between 8 to 10 characters long.
// $: Asserts the end of the string.
// This regex ensures that a password:

// Contains at least one lowercase letter, one uppercase letter, one digit, and one special character.
// Is between 8 to 10 characters long.
export const regex_password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Successfully copied to clipboard');
    } catch (err) {
        console.log('Unable to copy', err);
    }
}
const superscriptMapping = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    'a': 'ᵃ',
    'b': 'ᵇ',
    'c': 'ᶜ',
    'd': 'ᵈ',
    'e': 'ᵉ',
    'f': 'ᶠ',
    'g': 'ᵍ',
    'h': 'ʰ',
    'i': 'ⁱ',
    'j': 'ʲ',
    'k': 'ᵏ',
    'l': 'ˡ',
    'm': 'ᵐ',
    'n': 'ⁿ',
    'o': 'ᵒ',
    'p': 'ᵖ',
    'q': 'ʳ', // No standard superscript 'q', using 'r' as placeholder
    'r': 'ʳ',
    's': 'ˢ',
    't': 'ᵗ',
    'u': 'ᵘ',
    'v': 'ᵛ',
    'w': 'ʷ',
    'x': 'ˣ',
    'y': 'ʸ',
    'z': 'ᶻ',
}
const subscriptMapping = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
    'a': 'ₐ',
    'e': 'ₑ',
    'h': 'ₕ',
    'i': 'ᵢ',
    'j': 'ⱼ',
    'k': 'ₖ',
    'l': 'ₗ',
    'm': 'ₘ',
    'n': 'ₙ',
    'o': 'ₒ',
    'p': 'ₚ',
    'r': 'ᵣ',
    's': 'ₛ',
    't': 'ₜ',
    'u': 'ᵤ',
    'v': 'ᵥ',
    'x': 'ₓ',
    // No standard subscript 'z'
};
const greekMapping = {
    "alpha": "&#945;",
    "beta": "&#946;",
    "gamma": "&#947;",
    "delta": "&#948;",
    "epsilon": "&#949;",
    "zeta": "&#950;",
    "eta": "&#951;",
    "theta": "&#952;",
    "iota": "&#953;",
    "kappa": "&#954;",
    "lambda": "&#955;",
    "mu": "&#956;",
    "nu": "&#957;",
    "xi": "&#958;",
    "omicron": "&#959;",
    "pi": "&#960;",
    "rho": "&#961;",
    "sigma": "&#963;",
    "tau": "&#964;",
    "upsilon": "&#965;",
    "phi": "&#966;",
    "chi": "&#967;",
    "psi": "&#968;",
    "omega": "&#969;",
}

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll('.copy-btn');
    document.getElementById("topLeftButton").addEventListener("click", function() {
        window.location.href = "../Pages/newtab.html";
    });
    
    document.getElementById("topRightButton").addEventListener("click", function() {
        window.location.href = "../Pages/schedule.html";
    });
    document.getElementById("topRightButton2").addEventListener("click", function() {
        window.location.href = "../Pages/photo.html";
    });
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            console.log("Button clicked, adding class"); // Debug line
            this.classList.add('copy-btn-clicked'); // Add class

            // Existing logic to copy text
            let textId = e.target.getAttribute('data-text-id');
            let textElement = document.getElementById(textId);
            let text = textElement.textContent || textElement.innerText;
            copyToClipboard(text);

            // Remove the class after a short delay
            setTimeout(() => {
                console.log("Removing class"); // Debug line
                this.classList.remove('copy-btn-clicked');
            }, 150);
        });
    });
        
    // Superscript functionality
    const inputCharSuper = document.getElementById('inputCharSuper');
    const outputSuperscript = document.getElementById('outputSuperscript');
    const copySuperscriptBtn = document.getElementById('copySuperscript');

    inputCharSuper.addEventListener('input', function() {
        const str = inputCharSuper.value.toLowerCase(); // Convert to lowercase for case-insensitive mapping
        const superStr = Array.from(str).map(char => superscriptMapping[char] || char).join(''); // Map each character and join them
        outputSuperscript.innerText = superStr;
    });

    copySuperscriptBtn.addEventListener('click', function() {
        const superChar = outputSuperscript.textContent || outputSuperscript.innerText;
        copyToClipboard(superChar);
    });

    // Subscript functionality
    const inputCharSub = document.getElementById('inputChar');
    const outputSubscript = document.getElementById('outputSubscript');
    const copySubscriptBtn = document.getElementById('copySubscript');

    inputCharSub.addEventListener('input', function() {
        const str = inputCharSub.value.toLowerCase(); // Convert to lowercase for case-insensitive mapping
        const subStr = Array.from(str).map(char => subscriptMapping[char] || char).join(''); // Map each character and join them
        outputSubscript.innerText = subStr;
    });

    copySubscriptBtn.addEventListener('click', function() {
        const subChar = outputSubscript.textContent || outputSubscript.innerText;
        copyToClipboard(subChar);
    });

    const inputGreekName = document.getElementById('inputGreekName');
    const outputGreekLetter = document.getElementById('outputGreekLetter');
    const copyGreekLetterBtn = document.getElementById('copyGreekLetter');

    inputGreekName.addEventListener('input', function() {
        const input = inputGreekName.value.toLowerCase();
        const match = Object.keys(greekMapping).find(name => name.startsWith(input));
        const greekLetter = match ? greekMapping[match] : '';
        outputGreekLetter.innerHTML = greekLetter;
    });

    copyGreekLetterBtn.addEventListener('click', function() {
        const greekLetter = outputGreekLetter.innerHTML;
        copyToClipboard(greekLetter);
    });
});
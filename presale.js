document.addEventListener('DOMContentLoaded', () => {
    const enterPresaleLogo = document.getElementById('enter-presale');

    if (enterPresaleLogo) {
        enterPresaleLogo.addEventListener('click', () => {
            window.location.href = 'presale-details.html';
        });

        enterPresaleLogo.addEventListener('mouseover', () => {
            enterPresaleLogo.title = 'Enter the Presale';
        });
    }

    const presaleForm = document.getElementById('presale-form');
    const progressBar = document.querySelector('.progress');
    const currentRaised = document.getElementById('current-raised');
    const totalGoal = document.getElementById('total-goal');
    const amountInput = document.getElementById('amount');
    const currencySelect = document.getElementById('currency');
    const equivalentAmount = document.getElementById('equivalent-amount');
    const equivalentCurrency = document.getElementById('equivalent-currency');
    const connectMetamask = document.getElementById('connect-metamask');
    const connectTrustWallet = document.getElementById('connect-trustwallet');
    const buyTokensButton = document.getElementById('buy-tokens');
    const presaleDetails = document.getElementById('presale-details');

    let raised = 0;
    const goal = 10000000;
    let connectedWallet = null;

    const conversionRates = {
        USDT: 1,
        ETH: 0.0004144,
        BNB: 0.0018,
        TRX: 6.50,
        USD: 1.00
    };

    function updateProgress() {
        const progress = (raised / goal) * 100;
        progressBar.style.width = `${progress}%`;
        currentRaised.textContent = raised.toLocaleString();
        totalGoal.textContent = goal.toLocaleString();
    }

    function updateEquivalentAmount() {
        const amount = parseFloat(amountInput.value) || 0;
        const currency = currencySelect.value;
        const equivalent = amount * conversionRates[currency];
        equivalentAmount.textContent = equivalent.toFixed(6);
        equivalentCurrency.textContent = currency;
    }

    amountInput.addEventListener('input', updateEquivalentAmount);
    currencySelect.addEventListener('change', updateEquivalentAmount);

    async function connectWallet(walletType) {
        if (typeof window.ethereum !== 'undefined') {
            try {
                let provider = window.ethereum;
                await provider.request({ method: 'eth_requestAccounts' });
                connectedWallet = new ethers.providers.Web3Provider(provider);
                buyTokensButton.disabled = false;
                alert(`${walletType} connected successfully!`);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
                alert('Failed to connect wallet. Please try again.');
            }
        } else {
            alert('Please install MetaMask or Trust Wallet to connect.');
        }
    }

    connectMetamask.addEventListener('click', () => connectWallet('MetaMask'));
    connectTrustWallet.addEventListener('click', () => connectWallet('Trust Wallet'));

    presaleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!connectedWallet) {
            alert('Please connect your wallet first.');
            return;
        }

        const amount = parseFloat(amountInput.value);
        const currency = currencySelect.value;
        const equivalent = amount * conversionRates[currency];

        try {
            // Here you would typically interact with a smart contract to process the transaction
            // For this example, we'll just simulate a successful transaction
            console.log(`Buying ${amount} 3DOT tokens for ${equivalent} ${currency}`);
            raised += amount;
            updateProgress();
            alert(`Thank you for participating! You will receive ${amount} 3DOT tokens at the end of the presale.`);
            presaleForm.reset();
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Please try again.');
        }
    });

    const logoSection = document.querySelector('.logo-section');

    // Make sure these functions are only called if the elements exist
    if (presaleForm && progressBar && currentRaised && totalGoal) {
        updateProgress();
        updateEquivalentAmount();
    }
});

// Remove the duplicate event listener for DOMContentLoaded
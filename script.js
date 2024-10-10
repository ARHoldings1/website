document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    // Token Distribution Chart
    const ctx = document.getElementById('tokenDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Founders & Team',
                'Ecosystem Development',
                'Community & Incentives',
                'Partnerships & Marketing',
                'Liquidity & Exchanges',
                'Reserve & Emergency Fund',
                'Advisors & Legal'
            ],
            datasets: [{
                data: [10, 25, 20, 15, 15, 10, 5],
                backgroundColor: [
                    '#FFD700',
                    '#FFA500',
                    '#FF8C00',
                    '#FF7F50',
                    '#FF6347',
                    '#FF4500',
                    '#FF0000'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFD700'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}% (${value * 10} billion DPC20)`;
                        }
                    }
                }
            }
        }
    });
});

// Keep your existing code for the burger menu here
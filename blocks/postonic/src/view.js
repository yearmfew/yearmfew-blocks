/**
 * Frontend JavaScript for Postonic block
 */

document.addEventListener('DOMContentLoaded', function () {
    // Paylaş butonları için event listener
    const shareButtons = document.querySelectorAll('.postonic-share');

    shareButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const postUrl = this.closest('.postonic-item').querySelector('.postonic-title a').href;
            const postTitle = this.closest('.postonic-item').querySelector('.postonic-title').textContent;

            // Paylaşım menüsünü göster
            if (navigator.share) {
                navigator.share({
                    title: postTitle,
                    url: postUrl
                }).catch(console.error);
            } else {
                // Web Share API desteklenmiyorsa
                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
                window.open(shareUrl, '_blank');
            }
        });
    });
}); 
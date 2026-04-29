const instagramLink = document.querySelector('a[href*="instagram.com"]');

if (instagramLink) {
  instagramLink.addEventListener("click", () => {
    console.log("Usuario visitó el Instagram");
  });
}

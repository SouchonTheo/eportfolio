import { useState, useEffect } from "react";

const parseExperience = (mdContent) => {
  const experience = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const company = line.substr(3).trim();
      const positionLine = lines[++i]
        .substr(2)
        .split("|")
        .map((s) => s.trim());
      const position = positionLine[0].slice(1, -1);
      const duration = positionLine[1].trim();
      const imageLine = lines[++i];
      const image = imageLine.match(/!\[(.*)\]\((.*)\)/)[2];
      const tags = lines[++i].split(":")[1].trim();
      const badges = [];
      const listItems = [];
      const buttons = [];

      while (lines[++i] && !lines[i].startsWith("- Badges:")) { }
      while (lines[++i] && lines[i].startsWith("  - ")) {
        const badgeLine = lines[i].substr(4).split("[");
        const badgeName = badgeLine[0].trim();
        const badgeColor = badgeLine[1].split("]")[0].trim();
        badges.push({ name: badgeName, colorScheme: badgeColor });
      }

      while (lines[++i] && lines[i].startsWith("  - ")) {
        // check if line contains the char [ at any index
        const regex = /- (.+?) \[(.+?)\]/;
        const match = lines[i].match(regex);

        if (match) {
          const buttonText = match[1]; // Contient le nom du bouton (dans cet exemple, "Internship")
          const buttonHref = match[2]; // Contient le lien du bouton (dans cet exemple, "https://www.google.fr/")

          buttons.push({
            text: buttonText,
            href: buttonHref,
            target: "_blank",
          });
        } else {
          listItems.push(lines[i].substr(4)); // Ajoute le reste de la ligne sans le préfixe "- "
        }
      }

      experience.push({
        image,
        company,
        position,
        duration,
        badges,
        listItems,
        buttons,
        tags,
      });
    }
  }

  return experience;
};

const ExperienceArray = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("/content/Experience.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setExperience(parseExperience(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return experience;
};

export default ExperienceArray;

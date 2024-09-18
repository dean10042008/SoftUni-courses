function constructionCrew(obj) {
    const isDizzy = obj.dizziness;

    if (!isDizzy) {
        // Should be returned, but I like to keep the console.log() instead.
        console.log(obj);
        return;
    }

    obj.dizziness = false;
    obj.levelOfHydrated += 0.1 * obj.weight * obj.experience;
    // Should be returned, but I like to keep the console.log() instead.
    console.log(obj);
}

constructionCrew({ weight: 80, experience: 1, levelOfHydrated: 0, dizziness: true });
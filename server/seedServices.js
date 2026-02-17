const { sequelize, Service } = require('./models');

const servicesData = [
    // Same-Day Edit
    {
        name: 'Photo SDE',
        price: 15000,
        duration: 0,
        description: 'Same-Day Edit (Photo). Output after reception with layout. 500+ Edited pictures. 2 Photographers + 2 Editors.',
        category: 'Same-Day Edit (SDE)'
    },
    {
        name: 'Video SDE',
        price: 20000,
        duration: 0,
        description: 'Same-Day Edit (Video). Output after reception. 5-8 Minutes SDE Video. 1 Videographer + 1 Photographer + 1 Editor.',
        category: 'Same-Day Edit (SDE)'
    },

    // Pictorial Packages - Photo Only
    {
        name: 'Bronze Bundle (Pictorial)',
        price: 5000,
        duration: 0,
        description: 'Photo Only. Shoot & Edit Only, 2 Sets, 100 edited pics.',
        category: 'Pictorial (Photo Only)'
    },
    {
        name: 'Silver Bundle (Pictorial)',
        price: 7000,
        duration: 0,
        description: 'Photo Only. Shoot w/ Frame, 2-3 Sets, 300 edited pics, A4 Framed picture, Eco Bag.',
        category: 'Pictorial (Photo Only)'
    },
    {
        name: 'Gold Bundle (Pictorial)',
        price: 15000,
        duration: 0,
        description: 'Photo Only. Shoot w/ Album, 3-4 Sets, 500 edited pics, 2 A4 Framed pictures, Eco Bag, 20-page Album, 32GB Flash Drive.',
        category: 'Pictorial (Photo Only)'
    },

    // Pictorial Packages - Photo & Video
    {
        name: 'Jade Bundle',
        price: 15000,
        duration: 0,
        description: 'Photo & Video. Shoot & Edit Only, 2 Sets, 200 edited pics, 5 mins "Save the Date" video, A4 Framed picture, Eco Bag.',
        category: 'Pictorial (Photo & Video)'
    },
    {
        name: 'Sapphire Bundle',
        price: 20000,
        duration: 0,
        description: 'Photo & Video. Shoot w/ Album, 2-3 Sets, 300 edited pics, 7 mins "Save the Date" video, 2 A4 Framed pictures, Eco Bag, 10-page Album.',
        category: 'Pictorial (Photo & Video)'
    },
    {
        name: 'Garnet Bundle',
        price: 25000,
        duration: 0,
        description: 'Photo & Video. Shoot w/ Album, 3-4 Sets, 400 edited pics, 10 mins "Save the Date" video, 2 A4 Framed pictures, Eco Bag, 20-page Album w/ case, 64GB Flash Drive.',
        category: 'Pictorial (Photo & Video)'
    },

    // Event Packages - Photo & Video Bundles
    {
        name: 'Pearl Bundle',
        price: 15000,
        duration: 0,
        description: 'Photo & Video. Shoot & Edit Only. 1 Photographer, 1 Videographer. 200 Edited Pictures, 5 Mins Video Highlight.',
        category: 'Event (Photo & Video)'
    },
    {
        name: 'Emerald Bundle',
        price: 20000,
        duration: 0,
        description: 'Photo & Video. Shoot w/ Album. 2 Photographers, 1 Videographer. 300 Edited Pictures, 7 Mins Video Highlight. A4 Framed Picture, Eco Bag, 10-Page Album (no case).',
        category: 'Event (Photo & Video)'
    },
    {
        name: 'Diamond Bundle',
        price: 30000,
        duration: 0,
        description: 'Photo & Video. Shoot w/ Album. 2 Photographers, 2 Videographers. 500 Edited Pictures, 8-10 Mins Video Highlight. 2 A4 Framed Pictures, Eco Bag, 20-Page Album (w/ case), 64GB Flash Drive.',
        category: 'Event (Photo & Video)'
    },

    // Event Packages - Photo Only Bundles
    {
        name: 'Quartz Bundle (Event)',
        price: 6000,
        duration: 0,
        description: 'Photo Only. Shoot Only, 1 Photographer, 100 edited pics, Full Coverage.',
        category: 'Event (Photo Only)'
    },
    {
        name: 'Ruby Bundle (Event)',
        price: 10000,
        duration: 0,
        description: 'Photo Only. Shoot w/ Frame, 2 Photographers, 300 edited pics, Full Coverage, A4 Frame, Eco Bag.',
        category: 'Event (Photo Only)'
    },
    {
        name: 'Amethyst Bundle (Event)',
        price: 15000,
        duration: 0,
        description: 'Photo Only. Shoot w/ Album, 3 Photographers, 500 edited pics, Full Coverage, 2 A4 Frames, Eco Bag, 20-Page Album w/ case, 32GB Flash Drive.',
        category: 'Event (Photo Only)'
    },

    // Civil Wedding Bundles
    {
        name: 'Quartz Bundle (Civil)',
        price: 5000,
        duration: 0,
        description: 'Civil Wedding. Shoot Only, 1 Photographer, 150 edited pics.',
        category: 'Civil Wedding'
    },
    {
        name: 'Ruby Bundle (Civil)',
        price: 10000,
        duration: 0,
        description: 'Civil Wedding. Shoot w/ Frame, 1 Photographer, 1 Videographer, 200 edited pics, 3-4 Mins Highlight, 2 A4 Frames, Eco Bag.',
        category: 'Civil Wedding'
    },
    {
        name: 'Amethyst Bundle (Civil)',
        price: 15000,
        duration: 0,
        description: 'Civil Wedding. Shoot w/ Album, 2 Photographers, 1 Videographer, 500 edited pics, 5-7 Mins Highlight, 2 A4 Frames, Eco Bag, 20-Page Album w/ case, 64GB Flash Drive.',
        category: 'Civil Wedding'
    },

    // Kiddie Bundles
    {
        name: 'Topaz Bundle',
        price: 4000,
        duration: 0,
        description: 'Kiddie. Shoot Only, 1 Photographer, 150 edited pics.',
        category: 'Kiddie'
    },
    {
        name: 'Fluorite Bundle',
        price: 9000,
        duration: 0,
        description: 'Kiddie. Shoot w/ Frame, 1 Photographer, 1 Videographer, 200 edited pics, 3-4 Mins Highlight, 2 A4 Frames, Eco Bag.',
        category: 'Kiddie'
    },
    {
        name: 'Spinel Bundle',
        price: 14000,
        duration: 0,
        description: 'Kiddie. Shoot w/ Album, 1 Photographer, 2 Videographers, 500 edited pics, 5-6 Mins Highlight, 2 A4 Frames, Eco Bag, 20-Page Album w/ case, 64GB Flash Drive.',
        category: 'Kiddie'
    },

    // Photobooth
    {
        name: 'Photobooth Intimate',
        price: 3000,
        duration: 120,
        description: 'Photobooth (<90 pax). 2 Hours Duration, Sequins Backdrop, 4R Matte Photo, Softcopy Included, FREE Magnetic Colored Standee & Use of Props. Add-on: 500/hr.',
        category: 'Photobooth'
    },
    {
        name: 'Photobooth Public',
        price: 3500,
        duration: 120,
        description: 'Photobooth (>100 pax). 2 Hours Duration, Sequins Backdrop, 4R Matte Photo, Softcopy Included, FREE Magnetic Colored Standee & Use of Props. Add-on: 500/hr.',
        category: 'Photobooth'
    }
];

const seedServices = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Ensure tables match models

        console.log('Clearing existing services...');
        await Service.destroy({ where: {}, truncate: false }); // SQLite doesn't support truncate easily in Sequelize, but where: {} works

        console.log('Seeding new services...');
        for (const service of servicesData) {
            await Service.create(service);
        }

        console.log('Services seeded successfully!');
    } catch (error) {
        console.error('Error seeding services:', error);
    } finally {
        if (require.main === module) {
            await sequelize.close();
        }
    }
};

if (require.main === module) {
    seedServices();
}

module.exports = seedServices;

import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useDataStore = defineStore('mapstore', {
    state: () => {
        return {
            locations: [],
            filteredLocations: [],
            fundingOrgTypes: {
                "Charity Trust": [],
                "Community Foundation": [],
                "Corporate Foundation": [],
                "Donor Advised Fund": [],
                "Family Foundation": [],
                "Giving Circle": [],
                "Grant Making Charity": [],
                "Independent Grant Making Foundation": [],
                "Independent Grant Making Organisation": [],
                "Not for Profit Company with Charitable Status": [],
                "Philanthropy Intermediary": [],
                "Private Direct Donations": [],
                "Private Philanthropic Trust": [],
                "Social Finance Investing": [],
                "University Foundation": [],
                "Venture Philanthropy Fund": []
            },
            impactAreaCategories: {
                "Arts, Culture, and Heritage":
                    [
                        "Arts and Culture",
                        "Arts, Culture, and Health",
                        "Arts, Culture, and Social & Community Services",
                        "Heritage & Culture",
                        "Arts, Culture, and Reconciliation",
                        "Arts, Culture, and Tourism",
                        "Performing Arts (Music, Dance, Theater)",
                        "Visual Arts and Design",
                        "Literature and Publishing",
                        "Museums and Historical Sites",
                        "Public Arts Initiatives",
                        "Media, Film, and Broadcasting"
                    ],
                "Community Development & Social Services":
                    [
                        "Social & Community Services",
                        "Social & Community Development",
                        "Housing and Community Development",
                        "Community Relations, Reconciliation, Advocacy, and Civic Responsibility",
                        "Religion, Community Relations, Reconciliation, Advocacy, and Civic Responsibility",
                        "Philanthropy, Benevolence, and Volunteering",
                        "Homelessness Prevention and Support",
                        "Rural and Urban Community Development",
                        "Disaster Relief and Emergency Response",
                        "Local Government Capacity Building"
                    ],
                "Education & Research":
                    [
                        "Research and Education",
                        "Education, Research, and Social & Community Services",
                        "Education, Research, and Social & Community Development",
                        "International Research and Education",
                        "Early Childhood Education",
                        "Primary and Secondary Education (K-12)",
                        "Higher Education and Scholarships",
                        "Special Education and Disability Support",
                        "STEM (Science, Technology, Engineering, and Math) Education",
                        "Literacy Programs",
                        "Digital Learning and Educational Technology",
                        "Teacher Training and Professional Development"
                    ],
                "Environment & Sustainability":
                    [
                        "Environment and Animals",
                        "Environment, Animals, and Social & Community Services",
                        "Health, Animals, and Environment",
                        "Sustainability & Biodiversity",
                        "Balanced Regional Development",
                        "Climate Change Mitigation and Adaptation",
                        "Conservation and Wildlife Protection",
                        "Renewable Energy and Clean Technology",
                        "Water Conservation and Access",
                        "Pollution Reduction and Waste Management",
                        "Sustainable Agriculture and Food Systems",
                        "Urban Sustainability and Green Cities"
                    ],
                "Health & Wellbeing":
                    [
                        "Health",
                        "Health and Arts & Culture",
                        "Health and Education & Research",
                        "Health and Social & Community Services",
                        "Public Health Initiatives",
                        "Mental Health Support and Counseling",
                        "Nutrition and Food Security",
                        "Disease Prevention and Treatment (HIV/AIDS, Malaria, Cancer, etc.)",
                        "Disability Services and Accessibility",
                        "Substance Abuse Prevention and Rehabilitation",
                        "Maternal and Child Health",
                        "Reproductive Health and Family Planning",
                        "Medical Research and Innovation"
                    ],
                "Humanitarian & International Development":
                    [
                        "Humanitarian Aid (e.g., Irish Red Cross Appeal for Ukraine)",
                        "International Development",
                        "International Ecosystem Leadership",
                        "International Investment",
                        "International Network Support",
                        "International Social & Community Services",
                        "Migrant and Refugee Support",
                        "Emergency Relief Efforts",
                        "Global Health and Poverty Alleviation",
                        "Sustainable Economic Development"
                    ],
                "Peace & Reconciliation":
                    [
                        "Peace and Reconciliation",
                        "Community Relations, Reconciliation, and Advocacy",
                        "Conflict Resolution and Mediation",
                        "Countering Extremism and Radicalization",
                        "Human Rights and Social Justice Initiatives",
                        "Indigenous Rights and Representation"
                    ],
                "Poverty Alleviation & Economic Development":
                    [
                        "Basic Needs (Food, Water, Shelter)",
                        "Workforce Development and Vocational Training",
                        "Small Business and Entrepreneurship Support",
                        "Social Enterprise and Impact Investing",
                        "Financial Inclusion and Microfinance",
                        "Rural and Agricultural Development",
                        "Sustainable Economic Growth"
                    ],
                "Science, Technology, and Innovation":
                    [
                        "Scientific Research and Development",
                        "Technology Access and Digital Equity",
                        "Artificial Intelligence and Ethical Tech",
                        "Space Exploration and Aeronautics",
                        "Cybersecurity and Data Protection",
                        "Innovation Hubs and Startup Ecosystems",
                        "Digital Transformation for Social Good"
                    ],
                "Disability & Accessibility":
                    [
                        "Assistive Technologies and Services",
                        "Workplace Inclusion and Accommodations",
                        "Accessible Transportation and Infrastructure",
                        "Inclusive Education and Employment"
                    ],
                "Youth & Children's Services":
                    [
                        "Child Welfare and Protection",
                        "Youth Mentorship and Leadership Programs",
                        "After-School and Summer Programs",
                        "Child Rights Advocacy",
                        "Sports and Recreation for Youth"
                    ],
                "Housing & Urban Development":
                    [
                        "Affordable Housing Initiatives",
                        "Slum Upgrading and Urban Renewal",
                        "Sustainable Housing Solutions",
                        "Housing Rights and Tenant Advocacy",
                        "Urban Planning and Smart Cities"
                    ],
                "Sports & Physical Activity":
                    [
                        "Youth Sports Programs",
                        "Professional and Amateur Athlete Development",
                        "Sports for Social Impact",
                        "Adaptive Sports for Disabled Individuals"
                    ],
                "Philanthropy & Nonprofit Support":
                    [
                        "Capacity Building for NGOs",
                        "Leadership Development in the Nonprofit Sector",
                        "Funding Models and Impact Measurement",
                        "Collaborative Philanthropy and Donor Networks"
                    ]
            }
        };
    },
    actions: {
        async getLocations() {
            const response = await api.get();
            this.locations = response.data.map(item => ({
                ...item,
                latitude: parseFloat(item.geolat),
                longitude: parseFloat(item.geolong),
            }));
            this.filteredLocations = this.locations;
        },
        filterLocations({ min, max, organisations = [], names = [], areas = [], years = [], types = [] }) {
            console.log('Filtering with Impact Areas:', areas);
            this.filteredLocations = this.locations.filter(location => {
                const grant = parseInt(location.grantamount);
                const orgMatch = organisations.length === 0 || organisations.includes(location.fundingorganisation);
                const nameMatch = names.length === 0 || names.includes(location.projectname);
                const grantMatch = !isNaN(grant) && grant >= min && grant <= max;
                const impactAreaMatch = areas.length === 0 || areas.some(area =>
                    location.impactarea.split(', ').map(s => s.trim()).includes(area)
                );
                const yearMatch = years.length === 0 || years.includes(location.year);
                const typeMatch = types.length === 0 || types.includes(location.fundingmodel)
                return orgMatch && grantMatch && nameMatch && impactAreaMatch && yearMatch && typeMatch;
            });
        },
        // Optionally, you might want an action to reset the filter
        resetFilters() {
            this.filteredLocations = [...this.locations]; // Or however you want to reset
        },
    }
});
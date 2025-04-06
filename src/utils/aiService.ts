import { CareerGuidanceEntry } from './careerGuidanceUtils';

// Define your OpenAI API key and endpoint - this should be in your environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate a detailed career description using OpenAI's API
 */
export const generateAICareerDescription = async (
  career: CareerGuidanceEntry, 
  userName: string
): Promise<string> => {
  try {
    const prompt = `
      Generate a comprehensive, personalized career guide for ${userName} about becoming a ${career.suggestedCareer}.
      
      Include the following sections in this exact order:
      1. A title with the career name
      2. A brief introduction to the career (2-3 sentences)
      3. A detailed career roadmap section structured in phases:
         - Phase 1: Foundation (Years 0-2) with Educational Background, Core Skills to Learn, and Basic Tools
         - Phase 2: Specialization (Years 2-4) with Specialized Skills, Tools & Frameworks, Projects to Build
         - Phase 3: Advanced Development (Years 4-6) with Open Source Contributions, Portfolio Building
         - Phase 4: Career Pathways (Years 6+) with Job Titles and Growth Options
      4. Required Skills (Technical and Soft Skills)
      5. Salary Information (based on: ${career.salaryRange})
      6. Industry Outlook and Job Market
      7. Work Environment and Culture
      8. Resources for Further Learning
      
      Make it conversational, personalized, and include emojis for section headers.
      Format with clean headings using bold text (**) rather than markdown headings.
      Use clear phase headings, bullet points and numbered lists where appropriate.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      // Fallback to the template-based response if API fails
      console.error('API returned unexpected format:', data);
      return generateDetailedCareerRoadmap(career);
    }
  } catch (error) {
    console.error('Error generating AI career description:', error);
    // Fallback to template if API fails
    return generateDetailedCareerRoadmap(career);
  }
};

/**
 * Generate a detailed career roadmap specifically
 */
export const generateCareerRoadmap = async (
  career: CareerGuidanceEntry,
  userName: string
): Promise<string> => {
  try {
    const prompt = `
      Generate a detailed career roadmap for ${userName} about becoming a ${career.suggestedCareer}.
      
      Structure the roadmap in phases:
      - Phase 1: Foundation (Years 0-2) with Educational Background, Core Skills to Learn, and Basic Tools
      - Phase 2: Specialization (Years 2-4) with Specialized Skills, Tools & Frameworks, Projects to Build
      - Phase 3: Advanced Development (Years 4-6) with Open Source Contributions, Portfolio Building
      - Phase 4: Career Pathways (Years 6+) with Job Titles and Growth Options
      
      Include specific skills, tools, technologies, and resources relevant to this career.
      Make it detailed, actionable, and include emojis for section headers.
      Format with clean headings using bold text (**) rather than markdown headings.
      Use phases, bullet points and numbered lists where appropriate.
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1200
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      // Fallback to the template-based response if API fails
      console.error('API returned unexpected format:', data);
      return generateDetailedRoadmapTemplate(career);
    }
  } catch (error) {
    console.error('Error generating career roadmap:', error);
    // Fallback to template if API fails
    return generateDetailedRoadmapTemplate(career);
  }
};

/**
 * Fallback template-based career description when API is unavailable
 */
const generateDetailedCareerRoadmap = (career: CareerGuidanceEntry): string => {
  return `**${career.suggestedCareer}**

${career.suggestedCareer} is a profession that combines skills in ${career.skill} with interests related to ${career.hobby}. This career path allows professionals to apply technical expertise in creative and practical ways that align with their personal interests.

**🎯 Career Roadmap: ${career.suggestedCareer}**

**🔹 Phase 1: Foundation (Years 0-2)**
- **Educational Background**
  - Bachelor's degree in ${career.skill} or related field (recommended but not always required)
  - Relevant certifications and online courses
  - Self-learning through tutorials and documentation

- **Core Skills to Learn**
  - Fundamental principles of ${career.skill}
  - Basic understanding of industry tools and software
  - Problem-solving and analytical thinking
  - Communication skills for team collaboration

- **Basic Tools & Technologies**
  - Industry-standard software and platforms
  - Version control systems
  - Project management tools

**🔹 Phase 2: Specialization (Years 2-4)**
- **Specialized Skills**
  - Advanced techniques in ${career.skill}
  - In-depth knowledge of specific sub-fields
  - Project planning and execution
  - Quality assurance and testing methodologies

- **Tools & Frameworks**
  - Advanced software applications
  - Specialized frameworks for increased productivity
  - Automation tools for repetitive tasks

- **Projects to Build**
  - Personal portfolio showcasing your abilities
  - Collaborative projects with peers
  - Open source contributions to build reputation

**🔹 Phase 3: Professional Growth (Years 4-6)**
- **Career Progression**
  - Junior to mid-level positions
  - Mentorship opportunities
  - Leading small teams or projects
  - Specializing in high-demand niches

- **Advanced Development**
  - Research and development of new techniques
  - Optimization and efficiency improvements
  - Cross-functional collaboration
  - Problem-solving for complex challenges

**🔹 Phase 4: Leadership & Mastery (Years 6+)**
- **Senior Positions**
  - Team leadership roles
  - Project management
  - Strategy and vision development
  - Mentoring junior professionals

- **Alternative Pathways**
  - Consulting or freelancing
  - Starting your own business
  - Teaching and knowledge sharing
  - Research and innovation

**💰 Compensation & Benefits**
- **Salary Range:** ${career.salaryRange}
- **Work-Life Balance:** Most positions offer flexible hours and remote work possibilities
- **Growth Potential:** High demand across various industries with opportunities for advancement

**🔧 Required Skills**
- **Technical Skills:**
  - Strong foundation in ${career.skill}
  - Proficiency with industry tools and technologies
  - Problem-solving and analytical thinking

- **Soft Skills:**
  - Communication and collaboration
  - Time management
  - Adaptability
  - Attention to detail

**🌐 Industry Outlook**
The demand for ${career.suggestedCareer}s is growing rapidly as organizations continue to prioritize ${career.skill.toLowerCase()} capabilities. The field offers opportunities in various sectors including technology, healthcare, finance, entertainment, and more.

**🚀 Day-to-Day Responsibilities**
- Collaborating with cross-functional teams
- Designing and implementing solutions
- Testing and validating work
- Staying updated on industry trends and best practices
- Communicating progress and results to stakeholders

**📚 Recommended Resources**
- Professional associations and communities
- Industry conferences and workshops
- Online learning platforms (Coursera, Udemy, LinkedIn Learning)
- Books and publications specific to ${career.skill}

**💡 Would you like to know more about any specific aspect of this career roadmap?**`;
};

/**
 * Detailed roadmap template for when API is unavailable
 */
const generateDetailedRoadmapTemplate = (career: CareerGuidanceEntry): string => {
  return `**🎯 Detailed Career Roadmap: ${career.suggestedCareer}**

**🔹 Phase 1: Foundation (Years 0-2)**

**Educational Background**
- Bachelor's degree in ${career.skill} or related field (recommended)
- Relevant industry certifications
- Online courses and bootcamps focusing on core skills
- Self-learning through tutorials, documentation, and practice projects

**Core Skills to Learn**
- Fundamental principles and concepts of ${career.skill}
- Basic programming/technical skills relevant to the field
- Problem-solving and analytical thinking methodologies
- Industry standard terminology and processes
- Basic project management and organization

**Basic Tools & Technologies**
- Entry-level software and platforms used in the industry
- Version control systems (like Git)
- Communication and collaboration tools
- Basic productivity and project management tools

**🔹 Phase 2: Specialization (Years 2-4)**

**Specialized Skills Development**
- Advanced techniques in ${career.skill}
- Specialized knowledge areas relevant to career goals
- Process optimization and efficiency improvements
- Advanced problem-solving for complex challenges
- Technical writing and documentation

**Tools & Frameworks Mastery**
- Advanced software applications specific to your niche
- Specialized frameworks and platforms
- Automation tools for workflow enhancement
- Testing and quality assurance tools
- Data analysis and reporting tools

**Projects to Build**
- Personal portfolio showcasing progressive skill development
- Collaborative projects demonstrating teamwork
- Client work or simulated real-world projects
- Open source contributions or community involvement
- Specialized projects focusing on your intended niche

**🔹 Phase 3: Professional Development (Years 4-6)**

**Career Advancement**
- Moving from junior to mid-level positions
- Taking on increased responsibility
- Mentoring junior team members
- Leading small projects or teams
- Developing management and leadership skills

**Knowledge Expansion**
- Cross-functional skills development
- Business and strategic thinking
- Advanced technical specializations
- Industry trend awareness and adaptation
- Professional network development

**Contribution & Recognition**
- Speaking at industry events
- Publishing articles or research
- Building personal brand in the industry
- Contributing to significant projects
- Receiving professional recognition or awards

**🔹 Phase 4: Leadership & Mastery (Years 6+)**

**Senior Positions**
- Senior specialist or expert roles
- Team or department leadership
- Project management and oversight
- Strategy development and implementation
- Mentoring and talent development

**Alternative Career Paths**
- Consulting or freelancing
- Entrepreneurship opportunities
- Teaching or training roles
- Research and development
- Advisory or board positions

**Legacy & Innovation**
- Developing new methodologies or technologies
- Influencing industry standards or practices
- Creating intellectual property or publications
- Building sustainable teams or systems
- Giving back through mentorship programs

The specific journey for a ${career.suggestedCareer} will vary based on individual goals, company needs, and industry trends, but this roadmap provides a general framework to guide your career development.

**💡 Is there any specific phase or aspect of this career roadmap you'd like more details about?**`;
}; 
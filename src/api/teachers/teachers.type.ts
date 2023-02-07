export interface TeacherExperience{
    workPlaceName?: string;
    timeBegin?: Date;
    timeEnd?: Date;
    position?: string;
    accomplishments?: Text;
}

export interface TeacherEducation{
    educationPlaceName?: string;
    facultyName?: string;
    specializationName?: string;
    yearBegin?: number;
    yearEnd?: number;
    educationDegreeName?: string;
    accomplishments?: Text
}
import { jsPDF } from "jspdf";

export class DocumentCreatorPDF {
    // tslint:disable-next-line: typedef

    create([name, course, currentSemester, logo, idea, basics, niceToHave, technologies, team, hskl_branding]) {

        const { width, height } = this.calculateAspectRatioFit(logo.naturalWidth || logo.width, logo.naturalHeight || logo.height, 160, 30);
        const { widthHSKL, heightHSKL } = this.calculateAspectRatioFitHSKLBranding(hskl_branding.naturalWidth || hskl_branding.width, hskl_branding.naturalHeight || hskl_branding.height, 160, 25);

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });


        var left = 25;
        var leftTab1 = 35;
        var leftTab2 = 45;
        var top = 60;
        var helperTop = top;

        const textSizeTitle = 20;
        const textSizeHeading = 16;
        const textSizeSubHeading = 13;
        const textSizeText = 11;

        doc.addImage(hskl_branding, 135, 25, widthHSKL, heightHSKL);

        doc.setFont('times', 'bold');
        doc.setFontSize(textSizeTitle);
        doc.setTextColor('#2E74B5');
        doc.text(left, 40, name);
        doc.setDrawColor('#2E74B5');
        doc.setLineWidth(0.5);
        doc.line(left, 41, left + doc.getTextDimensions(name).w, 41);

        doc.setFont('times', 'normal');
        doc.setFontSize(textSizeText);
        doc.setTextColor('#000000');
        doc.text(left, 46, course);
        doc.text(left, 50, currentSemester);

        doc.addImage(logo, left, top, width, height);

        //---------------------

        top = top + 40;

        var ideaHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeHeading)
            .splitTextToSize("Grundidee", 160);
        doc.setTextColor('#2E74B5');
        doc.text(left, top, ideaHeadingLine);

        top = top + doc.getTextDimensions(ideaHeadingLine).h;

        var ideaLines = doc.setFont('times', 'normal')
            .setFontSize(textSizeText)
            .splitTextToSize(idea, 160);
        doc.setTextColor('#000000');
        doc.text(left, top, ideaLines);

        top = top + doc.getTextDimensions(ideaLines).h + 5;


        //---------------------

        var featuresHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeHeading)
            .splitTextToSize("Features", 160);
        var basicsHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeSubHeading)
            .splitTextToSize("Grundfunktionalitäten", 150);
        var basicsLines = doc.setFont('times', 'normal')
            .setFontSize(textSizeText)
            .splitTextToSize(basics, 140);

        var niceToHaveHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeSubHeading)
            .splitTextToSize("Nice-To-Have Features", 150);
        var niceToHaveLines = doc.setFont('times', 'normal')
            .setFontSize(textSizeText)
            .splitTextToSize(niceToHave, 140);

        var technologiesHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeHeading)
            .splitTextToSize("Technologien", 160);
        var technologiesLines = doc.setFont('times', 'normal')
            .setFontSize(textSizeText)
            .splitTextToSize(technologies, 150);

        var teamHeadingLine = doc.setFont('times', 'normal')
            .setFontSize(textSizeHeading)
            .splitTextToSize("Team", 160);
        var teamLines = doc.setFont('times', 'normal')
            .setFontSize(textSizeText)
            .splitTextToSize(team, 150);

        helperTop = top + doc.getTextDimensions(featuresHeadingLine).h + doc.getTextDimensions(basicsHeadingLine).h + doc.getTextDimensions(basicsLines).h;
            /* + doc.getTextDimensions(niceToHaveHeadingLine).h + doc.getTextDimensions(niceToHaveLines).h
            + doc.getTextDimensions(technologiesHeadingLine).h + doc.getTextDimensions(technologiesLines).h
            + doc.getTextDimensions(teamHeadingLine).h + doc.getTextDimensions(teamLines).h; */

        if (helperTop > 267) {
            doc.addPage();
            top = 30;
        }

        //setText FeatureHeading
        doc.setFontSize(textSizeHeading);
        doc.setTextColor('#2E74B5');
        doc.text(left, top, featuresHeadingLine);

        top = top + doc.getTextDimensions(featuresHeadingLine).h;

        //setText BasicsHeading
        doc.setFontSize(textSizeSubHeading);
        doc.setTextColor('#2E74B5');
        doc.text(leftTab1, top, basicsHeadingLine);

        top = top + doc.getTextDimensions(basicsHeadingLine).h;

        //setText Basics
        doc.setFontSize(textSizeText);
        doc.setTextColor('#000000');
        doc.text(leftTab2, top, basicsLines);

        top = top + doc.getTextDimensions(basicsLines).h + 5;

        //-----------------------

        helperTop = top + doc.getTextDimensions(niceToHaveHeadingLine).h + doc.getTextDimensions(niceToHaveLines).h;

        if (helperTop > 267) {
            doc.addPage();
            top = 30;
        }

        //setText NiceToHaveHeading
        doc.setFontSize(textSizeSubHeading)
        doc.setTextColor('#2E74B5');
        doc.text(leftTab1, top, niceToHaveHeadingLine);

        top = top + doc.getTextDimensions(niceToHaveHeadingLine).h;

        //setText NiceToHave
        doc.setFontSize(textSizeText)
        doc.setTextColor('#000000');
        doc.text(leftTab2, top, niceToHaveLines);

        top = top + doc.getTextDimensions(niceToHaveLines).h + 5;

        //-----------------------

        helperTop = top + doc.getTextDimensions(technologiesHeadingLine).h + doc.getTextDimensions(technologiesLines).h;
            
        if (helperTop > 267) {
            doc.addPage();
            top = 30;
        }

        //setText TechHeading
        doc.setFontSize(textSizeHeading);
        doc.setTextColor('#2E74B5');
        doc.text(left, top, technologiesHeadingLine);

        top = top + doc.getTextDimensions(technologiesHeadingLine).h;

        //setText Tech
        doc.setFontSize(textSizeText);
        doc.setTextColor('#000000');
        doc.text(leftTab1, top, technologiesLines);

        top = top + doc.getTextDimensions(technologiesLines).h + 5;

        //-----------------------

        helperTop = top + doc.getTextDimensions(teamHeadingLine).h + doc.getTextDimensions(teamLines).h;

        if (helperTop > 267) {
            doc.addPage();
            top = 30;
        }

        //setText TeamHeading
        doc.setFontSize(textSizeHeading);
        doc.setTextColor('#2E74B5');
        doc.text(left, top, teamHeadingLine);

        top = top + doc.getTextDimensions(teamHeadingLine).h;

        //setText Team
        doc.setFontSize(textSizeText);
        doc.setTextColor('#000000');
        doc.text(leftTab1, top, teamLines);

        return doc;

    }

    calculateAspectRatioFit(
        srcWidth,
        srcHeight,
        maxWidth,
        maxHeight
    ) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return { width: srcWidth * ratio, height: srcHeight * ratio };
    }

    calculateAspectRatioFitHSKLBranding(
        srcWidth,
        srcHeight,
        maxWidth,
        maxHeight
    ) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return { widthHSKL: srcWidth * ratio, heightHSKL: srcHeight * ratio };
    }
}
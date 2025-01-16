import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { OEMService } from '../oem.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ResultComponent } from '../result/result.component';
import { OemKeys } from '../oem.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [CommonModule, FormsModule, ResultComponent],
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {


    // Auto Focus
    @ViewChild('autoFocusInput', { static: false }) autoFocusInput!: ElementRef;

    formData = {
        oem: '' as OemKeys | null,
        roPerDay: null,
        liabilityClaims: null,
        tradeIns: null,
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
    };

    backgroundImage: string = 'assets/gen-bg2.png';
    currentStep = 0;
    results: any = null;
    calculatorVisible = true;
    resultVisible: boolean = false;


    // Constructor
    constructor(public oemService: OEMService, private renderer: Renderer2) { }


    // OEM Select
    onOEMChange(selectedOEM: OemKeys | null): void {
        console.log('OEM Selected:', selectedOEM);
        if (selectedOEM) {
            const oemData = this.oemService.oemValues[selectedOEM];
            if (oemData) {
                this.backgroundImage = oemData.image;
            }
        } else {
            this.backgroundImage = '';
        }
    }



    // Next via Enter
    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.currentStep < 5) {
                this.nextStep();
            } else if (this.currentStep === 5 && this.isStepValid(5)) {
                this.calculateResults();
            }
        }
    }


    // Next Step
    nextStep(): void {
        if (!this.isStepValid(this.currentStep)) {
            return;
        }
        this.currentStep++;
        setTimeout(() => this.focusInput(), 0);
    }


    // Focus Input
    private focusInput(): void {
        const inputs = document.querySelectorAll('input, select');
        const currentInput = Array.from(inputs).find((input) => input === document.activeElement);
        const currentIndex = Array.from(inputs).indexOf(currentInput as HTMLElement);
        if (inputs[currentIndex + 1]) {
            (inputs[currentIndex + 1] as HTMLElement).focus();
        }
    }


    // Submittion
    onSubmit(form: NgForm): void {
        if (this.isStepValid(5)) {
            this.calculateResults();
        } else {
            alert('Please complete all required fields.');
        }
    }

    // Validation
    isStepValid(step: number): boolean {
        switch (step) {
            case 1:
                return this.formData.oem !== null;
            case 2:
                return this.formData.roPerDay !== null && this.formData.roPerDay > 0;
            case 3:
                return this.formData.liabilityClaims !== null && this.formData.liabilityClaims >= 0;
            case 4:
                return this.formData.tradeIns !== null && this.formData.tradeIns >= 0;
            case 5:
                return (
                    this.formData.firstName.trim() !== '' &&
                    this.formData.lastName.trim() !== '' &&
                    this.formData.company.trim() !== '' &&
                    this.formData.phone.trim() !== '' &&
                    this.formData.email.trim() !== ''
                );
            default:
                return true;
        }
    }

    // Calculate results & display
    calculateResults(): void {
        this.results = this.oemService.calculateROI(this.formData);
        this.resultVisible = true;
        this.calculatorVisible = false;
    }

}

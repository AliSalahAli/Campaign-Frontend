import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Campaign } from '../../models/campaign.model';
import { max } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatedResult } from '../../models/paginate.mode';
import { formatDate } from '@angular/common';
import { PageEvent } from '../../models/pagination-settings.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  campaings: Campaign[] = [];
  basicData: any;
  dataForm!: FormGroup;

  basicOptions: any;

  first = 1;

  rows = 5;
  totalCounts: number = 0;
  constructor(private service: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    // this.getCampaings();
    this.dataForm = this.fb.group({
      ad_id: [''],
      fb_campaign_id: [''],
      xyz_campaign_id: [''],
      start_date: [''],
      end_date: [''],
    });
    this.getFilteredCampaignData();
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    this.getFilteredCampaignData();
  }
  isLastPage(): boolean {
    return this.campaings
      ? this.first === this.campaings.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.campaings ? this.first === 1 : true;
  }

  getCampaings() {
    this.service.getCampaigns().subscribe((res) => {
      this.campaings = res;
      this.getChart();
    });
  }

  getChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Labels from 0 to 10
    const labels = Array.from({ length: 11 }, (_, i) => i.toString());

    console.log(this.campaings);

    // Extract data from the campaigns (assuming there might be multiple campaigns in the future)
    const interest = this.campaings.map((c) => c.interest);
    const clicks = this.campaings.map((c) => c.clicks);
    const totalConversion = this.campaings.map((c) => c.total_conversion);
    const approvedConversion = this.campaings.map((c) => c.approved_conversion);

    console.log(
      'Interest : ',
      interest,
      'Clicks : ',
      clicks,
      'Total Conversion : ',
      totalConversion,
      'Approved Conversion : ',
      approvedConversion
    );

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Interest',
          data: interest,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
        },
        {
          label: 'Clicks',
          data: clicks,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        },
        {
          label: 'Total Conversion',
          data: totalConversion,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
        {
          label: 'Approved Conversion',
          data: approvedConversion,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1,
        },
      ],
    };

    const campaigns: any = this.campaings; // Create a reference to this.campaigns

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const dataIndex = context.dataIndex;
              const campaignData = campaigns[dataIndex];
              let tooltipText = '';
              for (let key in campaignData) {
                tooltipText += `${key}: ${campaignData[key]}\n`;
              }
              return tooltipText;
            }.bind(this), // Bind 'this' to ensure proper context
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0, // Minimum value for y-axis
          max: Math.max(
            ...interest,
            ...clicks,
            ...totalConversion,
            ...approvedConversion
          ) + 5, // Maximum value for y-axis
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          max: campaigns.length-1  ,
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getFilteredCampaignData() {
    console.log(this.dataForm);

    // return;
    const formData = {
      ...this.dataForm.value,
      page: this.first || 1,
      limit: this.rows,
    };

    if (formData.start_date)
      formData.start_date = this.formatDate(formData.start_date);

    if (formData.end_date)
      formData.end_date = this.formatDate(formData.end_date);
    this.service
      .filterCampaign(formData)
      .subscribe((result: PaginatedResult<Campaign>) => {
        console.log(result);
        this.campaings = result.data;
        this.totalCounts = result.totalCount || 0;
        this.getChart();
      });
  }

  onSubmit() {
    this.first = 1;
    this.getFilteredCampaignData();
  }

  private formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}

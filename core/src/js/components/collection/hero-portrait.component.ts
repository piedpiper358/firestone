import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LocalizationFacadeService } from '../../services/localization-facade.service';
import { CollectionReferenceCard } from './collection-reference-card';

@Component({
	selector: 'hero-portrait',
	styleUrls: [`../../../css/component/collection/hero-portrait.component.scss`],
	template: `
		<div class="hero-portrait" [ngClass]="{ 'missing': missing, 'showing-placeholder': showPlaceholder }">
			<div class="perspective-wrapper" rotateOnMouseOver>
				<img class="placeholder" src="assets/images/hero-placeholder.png" />
				<img class="real-portrait" [src]="image" (load)="imageLoadedHandler()"/>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPortraitComponent {
	@Input() set heroPortrait(value: CollectionReferenceCard) {
		this.missing = value.numberOwned === 0;
		this.image = this.i18n.getCardImage(value.id, { isHeroSkin: true });
	}

	missing: boolean;
	image: string;
	showPlaceholder = true;

	constructor(private readonly i18n: LocalizationFacadeService) {}

	imageLoadedHandler() {
		this.showPlaceholder = false;
	}
}
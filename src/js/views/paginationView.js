import icons from 'url:../../img/icons.svg';
import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateButtonMarkup(direction) {
    let pageNumber = this._data.page;
    direction.toLowerCase() === 'prev' ? (pageNumber -= 1) : (pageNumber += 1);

    return `
        <button data-goto= "${pageNumber}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      direction === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
            <span>Page ${pageNumber}</span>
        </button>
      `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev');
    }
    // Other page
    if (curPage < numPages) {
      return `
        ${this._generateButtonMarkup('prev')}${this._generateButtonMarkup(
        'next'
      )}
      `;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();

package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.Credit;

import ma.oth.repository.CreditRepository;
import ma.oth.web.rest.errors.BadRequestAlertException;
import ma.oth.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Credit.
 */
@RestController
@RequestMapping("/api")
public class CreditResource {

    private final Logger log = LoggerFactory.getLogger(CreditResource.class);

    private static final String ENTITY_NAME = "credit";

    private final CreditRepository creditRepository;

    public CreditResource(CreditRepository creditRepository) {
        this.creditRepository = creditRepository;
    }

    /**
     * POST  /credits : Create a new credit.
     *
     * @param credit the credit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new credit, or with status 400 (Bad Request) if the credit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/credits")
    @Timed
    public ResponseEntity<Credit> createCredit(@RequestBody Credit credit) throws URISyntaxException {
        log.debug("REST request to save Credit : {}", credit);
        if (credit.getId() != null) {
            throw new BadRequestAlertException("A new credit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Credit result = creditRepository.save(credit);
        return ResponseEntity.created(new URI("/api/credits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /credits : Updates an existing credit.
     *
     * @param credit the credit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated credit,
     * or with status 400 (Bad Request) if the credit is not valid,
     * or with status 500 (Internal Server Error) if the credit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/credits")
    @Timed
    public ResponseEntity<Credit> updateCredit(@RequestBody Credit credit) throws URISyntaxException {
        log.debug("REST request to update Credit : {}", credit);
        if (credit.getId() == null) {
            return createCredit(credit);
        }
        Credit result = creditRepository.save(credit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, credit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /credits : get all the credits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of credits in body
     */
    @GetMapping("/credits")
    @Timed
    public List<Credit> getAllCredits() {
        log.debug("REST request to get all Credits");
        return creditRepository.findAll();
        }

    /**
     * GET  /credits/:id : get the "id" credit.
     *
     * @param id the id of the credit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the credit, or with status 404 (Not Found)
     */
    @GetMapping("/credits/{id}")
    @Timed
    public ResponseEntity<Credit> getCredit(@PathVariable Long id) {
        log.debug("REST request to get Credit : {}", id);
        Credit credit = creditRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(credit));
    }

    /**
     * DELETE  /credits/:id : delete the "id" credit.
     *
     * @param id the id of the credit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/credits/{id}")
    @Timed
    public ResponseEntity<Void> deleteCredit(@PathVariable Long id) {
        log.debug("REST request to delete Credit : {}", id);
        creditRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
